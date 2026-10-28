/* ==========================================================================
   SlevaMap Prague - behaviour (plain JavaScript, no libraries)
   ========================================================================== */
'use strict';

/* Respect users who prefer less motion */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const verifiedKey = 'slevamap.studentVerified';
const savedKey = 'slevamap.savedOffers';

const isStudentVerified = () => localStorage.getItem(verifiedKey) === 'true';
const readSavedOffers = () => {
  const saved = JSON.parse(localStorage.getItem(savedKey) || '[]');
  if (!Array.isArray(saved)) throw new TypeError('Saved offers data is invalid.');
  return saved;
};
const writeSavedOffers = offers => localStorage.setItem(savedKey, JSON.stringify(offers));
const offerId = title => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function offerFromCard(card) {
  const titleLink = card.querySelector('.body h3 a');
  const image = card.querySelector('.media img');
  const merchant = card.querySelector('.body h3 + p');
  return {
    id: offerId(titleLink.textContent.trim()),
    title: titleLink.textContent.trim(),
    merchant: merchant ? merchant.textContent.trim() : '',
    discount: card.querySelector('.tag')?.textContent.trim() || '',
    category: card.dataset.cat || '',
    audience: card.dataset.aud || '',
    url: titleLink.href,
    image: image ? image.src : ''
  };
}

function showSaveStatus(message) {
  let status = document.getElementById('save-status');
  if (!status) {
    status = document.createElement('p');
    status.id = 'save-status';
    status.className = 'save-status muted';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    document.querySelector('main')?.prepend(status);
  }
  status.textContent = message;
}

function saveOffer(offer) {
  const offers = readSavedOffers();
  if (!offers.some(saved => saved.id === offer.id)) {
    offers.push(offer);
    writeSavedOffers(offers);
  }
}

function removeOffer(id) {
  writeSavedOffers(readSavedOffers().filter(offer => offer.id !== id));
}

function requestSave(offer) {
  if (!isStudentVerified()) {
    sessionStorage.setItem('slevamap.pendingOffer', JSON.stringify(offer));
    sessionStorage.setItem('slevamap.returnTo', location.href);
    location.href = 'isic.html';
    return false;
  }
  saveOffer(offer);
  return true;
}

/* 1. MOBILE MENU: the button toggles .open and tells screen readers via aria-expanded */
const menuBtn = document.querySelector('.menu');
const nav     = document.getElementById('nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
}

/* 2. DEAL FILTERS (deals page only): hide cards that do not match both selects */
const list = document.getElementById('list');
if (list) {
  const cat   = document.getElementById('cat');
  const aud   = document.getElementById('aud');
  const count = document.getElementById('count');           /* aria-live text */
  const categoryNames = {
    grocery: 'Grocery',
    food: 'Food and cafes',
    fashion: 'Fashion',
    sports: 'Sport',
    tech: 'Technology',
    travel: 'Travel',
    services: 'Services and mobile',
    culture: 'Books and culture',
    wellness: 'Health and wellness',
    entertainment: 'Entertainment',
    games: 'Games'
  };
  const categoryOrder = Object.keys(categoryNames);
  const today = new Date();
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  list.querySelectorAll('img[src^="https://ap-dm-public.s3.eu-central-1.amazonaws.com/"]').forEach(image => {
    const sourceCard = image.closest('.deal');
    const sourceLink = sourceCard?.querySelector('.body h3 a');
    const duplicate = [...list.querySelectorAll('.deal')].find(card =>
      card !== sourceCard && card.querySelector('.body h3 a')?.href === sourceLink?.href
    );
    if (duplicate) {
      const targetImage = duplicate.querySelector('.media img');
      if (targetImage) targetImage.src = image.src;
      sourceCard.remove();
    }
  });
  const cards = [...list.querySelectorAll(':scope > .deal')];
  const sortedCards = cards.sort((left, right) => {
    const categoryDifference = categoryOrder.indexOf(left.dataset.cat) - categoryOrder.indexOf(right.dataset.cat);
    if (categoryDifference) return categoryDifference;
    return left.querySelector('h3 a').textContent.localeCompare(right.querySelector('h3 a').textContent);
  });
  const headings = new Map();
  list.replaceChildren();
  let previousCategory = '';
  sortedCards.forEach(card => {
    const category = card.dataset.cat;
    if (category !== previousCategory) {
      const heading = document.createElement('li');
      heading.className = 'category-heading';
      heading.dataset.category = category;
      const title = document.createElement('h2');
      title.textContent = categoryNames[category] || category;
      heading.append(title);
      list.append(heading);
      headings.set(category, heading);
      previousCategory = category;
    }
    list.append(card);
    if (card.dataset.expires && card.dataset.expires < todayKey) {
      card.hidden = true;
      card.dataset.expired = 'true';
    }
  });

  /* Links like deals.html#student or #grocery preselect a filter */
  const hash = location.hash.slice(1);
  if ((hash === 'student' || hash === 'everyone')
      && [...aud.options].some(option => option.value === hash)) aud.value = hash;
  else if ([...cat.options].some(o => o.value === hash))  cat.value = hash;

  const apply = () => {
    let shown = 0;
    list.querySelectorAll('.deal').forEach(card => {
      const match = (cat.value === 'all' || card.dataset.cat === cat.value)
                 && (aud.value === 'all' || card.dataset.aud === aud.value);
      const visible = match && card.dataset.expired !== 'true';
      card.hidden = !visible;                                 /* hidden = removed from view and from screen readers */
      if (visible) shown++;
    });
    headings.forEach((heading, category) => {
      heading.hidden = ![...list.querySelectorAll(`.deal[data-cat="${category}"]`)].some(card => !card.hidden);
    });
    document.querySelectorAll('.upcoming a[href^="#"]').forEach(link => {
      const target = document.getElementById(link.hash.slice(1));
      link.parentElement.hidden = !target || target.hidden;
    });
    const upcoming = document.querySelector('.upcoming');
    if (upcoming) upcoming.hidden = ![...upcoming.querySelectorAll('li')].some(item => !item.hidden);
    count.textContent = shown + ' deals shown';
  };
  cat.addEventListener('change', apply);
  aud.addEventListener('change', apply);
  apply();
}

/* 3. SAVING DEALS: student status is required before an offer can be saved */
document.querySelectorAll('.deal').forEach(card => {
  const body = card.querySelector('.body');
  if (!body) return;
  const offer = offerFromCard(card);
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn alt save-toggle';
  button.dataset.offerId = offer.id;
  body.append(button);

  const updateButton = () => {
    const saved = readSavedOffers().some(item => item.id === offer.id);
    button.textContent = saved ? 'Saved · remove' : 'Save offer';
    button.setAttribute('aria-pressed', String(saved));
  };
  updateButton();
  button.addEventListener('click', () => {
    if (offer.audience === 'student' && !isStudentVerified()) {
      requestSave(offer);
      return;
    }
    if (readSavedOffers().some(item => item.id === offer.id)) {
      removeOffer(offer.id);
      showSaveStatus('Offer removed from your saved deals.');
    } else {
      saveOffer(offer);
      showSaveStatus('Offer saved.');
    }
    updateButton();
  });
});

const detail = document.querySelector('.detail[data-id]');
const detailSave = document.getElementById('save-detail');
if (detail && detailSave) {
  const offer = {
    id: detail.dataset.id,
    title: detail.querySelector('h1').textContent.trim(),
    merchant: detail.querySelector('address')?.firstChild?.textContent.trim() || '',
    discount: detail.querySelector('.tag')?.textContent.trim() || '',
    category: detail.dataset.cat || '',
    audience: detail.dataset.aud || '',
    url: location.href,
    image: detail.querySelector('.big')?.src || ''
  };
  const updateButton = () => {
    const saved = readSavedOffers().some(item => item.id === offer.id);
    detailSave.textContent = saved ? 'Saved · remove' : 'Save deal';
    detailSave.setAttribute('aria-pressed', String(saved));
  };
  updateButton();
  detailSave.addEventListener('click', () => {
    if (offer.audience === 'student' && !isStudentVerified()) {
      requestSave(offer);
      return;
    }
    if (readSavedOffers().some(item => item.id === offer.id)) {
      removeOffer(offer.id);
      showSaveStatus('Deal removed from your saved deals.');
    } else {
      saveOffer(offer);
      showSaveStatus('Deal saved.');
    }
    updateButton();
  });
}

/* 4. ISIC demo flow: do not present this local confirmation as real verification */
const verificationForm = document.getElementById('verification-form');
if (verificationForm) {
  verificationForm.addEventListener('submit', event => {
    event.preventDefault();
    const status = document.getElementById('verification-status');
    const confirmation = document.getElementById('registration-complete');
    if (!confirmation.checked) {
      status.textContent = 'Please confirm that you have completed ISIC registration first.';
      return;
    }
    localStorage.setItem(verifiedKey, 'true');
    const pending = sessionStorage.getItem('slevamap.pendingOffer');
    if (pending) {
      saveOffer(JSON.parse(pending));
      sessionStorage.removeItem('slevamap.pendingOffer');
    }
    const returnTo = sessionStorage.getItem('slevamap.returnTo');
    sessionStorage.removeItem('slevamap.returnTo');
    if (returnTo && new URL(returnTo).origin === location.origin) {
      location.href = returnTo;
      return;
    }
    location.href = pending ? 'saved.html' : 'deals.html';
  });
}

/* 5. SAVED PAGE: list offers and clearly show their saved state */
const savedList = document.getElementById('saved-list');
if (savedList) {
  const empty = document.getElementById('saved-empty');
  const count = document.getElementById('saved-count');
  const renderSaved = () => {
    const offers = readSavedOffers();
    savedList.replaceChildren();
    count.textContent = `${offers.length} saved ${offers.length === 1 ? 'offer' : 'offers'}`;
    empty.hidden = offers.length > 0;
    offers.forEach(offer => {
      const card = document.createElement('li');
      card.className = 'deal saved-card';
      const imageLink = document.createElement('a');
      imageLink.className = 'media';
      imageLink.href = offer.url;
      if (/^https?:/.test(offer.url)) {
        imageLink.target = '_blank';
        imageLink.rel = 'noopener noreferrer';
      }
      const image = document.createElement('img');
      image.src = offer.image;
      image.alt = '';
      image.loading = 'lazy';
      imageLink.append(image);

      const body = document.createElement('div');
      body.className = 'body';
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = offer.discount;
      const heading = document.createElement('h2');
      const link = document.createElement('a');
      link.href = offer.url;
      link.textContent = offer.title;
      if (/^https?:/.test(offer.url)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      heading.append(link);
      const merchant = document.createElement('p');
      merchant.textContent = offer.merchant;
      const state = document.createElement('p');
      state.className = 'meta';
      state.textContent = 'Saved';
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'btn alt';
      remove.textContent = 'Remove saved offer';
      remove.addEventListener('click', () => {
        removeOffer(offer.id);
        renderSaved();
      });
      body.append(tag, heading, merchant, state, remove);
      card.append(imageLink, body);
      savedList.append(card);
    });
  };
  renderSaved();
}

/* 3. SCROLL REVEAL: elements fade in once when they enter the screen.
      --i gives each item a small delay so a row appears one by one. */
const targets = document.querySelectorAll('.deal, .tile, .steps li, .stats li, section > h2, .authors li, .grid > li');
if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: .15 });
  targets.forEach((el, i) => { el.classList.add('reveal'); el.style.setProperty('--i', i % 3); io.observe(el); });
}

/* 6. COUNTERS: numbers in .stats count up from 0 when visible (data-count = end value) */
document.querySelectorAll('[data-count]').forEach(el => {
  const end = +el.dataset.count, suffix = el.dataset.suffix || '';
  if (reduce) { el.textContent = end + suffix; return; }
  new IntersectionObserver(([entry], obs) => {
    if (!entry.isIntersecting) return;
    obs.disconnect();
    const t0 = performance.now(), ms = 1400;
    const tick = now => {
      const p = Math.min((now - t0) / ms, 1);                /* progress 0 to 1 */
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;   /* ease-out curve */
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }).observe(el);
});

/* 7. CARD TILT: cards turn slightly towards the pointer (mouse only, not touch) */
if (!reduce && matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.deal').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.classList.add('tilt');
      card.style.setProperty('--ry', ((e.clientX - r.left) / r.width  - .5) *  10 + 'deg');
      card.style.setProperty('--rx', ((e.clientY - r.top)  / r.height - .5) * -10 + 'deg');
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg');
    });
  });
}

/* 8. STICKY HEADER + PROGRESS BAR: one scroll listener does both jobs */
const header = document.querySelector('.top');
const bar    = Object.assign(document.createElement('div'), { id: 'progress' });
document.body.prepend(bar);
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (header) header.classList.toggle('small', scrollY > 40); /* header shrinks after 40px */
  bar.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
}, { passive: true });
