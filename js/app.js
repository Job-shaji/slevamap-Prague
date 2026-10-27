/* ==========================================================================
   SlevaMap Prague - behaviour (plain JavaScript, no libraries)
   1 mobile menu, 2 deal filters, 3 scroll reveal, 4 counters,
   5 card tilt, 6 sticky header + progress bar
   ========================================================================== */
'use strict';

/* Respect users who prefer less motion */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1. MOBILE MENU: the button toggles .open and tells screen readers via aria-expanded */
const menuBtn = document.querySelector('.menu');
const nav     = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

/* 2. DEAL FILTERS (deals page only): hide cards that do not match both selects */
const list = document.getElementById('list');
if (list) {
  const cat   = document.getElementById('cat');
  const aud   = document.getElementById('aud');
  const count = document.getElementById('count');           /* aria-live text */

  /* Links like deals.html#student or #grocery preselect a filter */
  const hash = location.hash.slice(1);
  if (hash === 'student' || hash === 'everyone')          aud.value = hash;
  else if ([...cat.options].some(o => o.value === hash))  cat.value = hash;

  const apply = () => {
    let shown = 0;
    list.querySelectorAll('.deal').forEach(card => {
      const match = (cat.value === 'all' || card.dataset.cat === cat.value)
                 && (aud.value === 'all' || card.dataset.aud === aud.value);
      card.hidden = !match;                                  /* hidden = removed from view and from screen readers */
      if (match) shown++;
    });
    count.textContent = shown + ' deals shown';
  };
  cat.addEventListener('change', apply);
  aud.addEventListener('change', apply);
  apply();
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

/* 4. COUNTERS: numbers in .stats count up from 0 when visible (data-count = end value) */
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

/* 5. CARD TILT: cards turn slightly towards the pointer (mouse only, not touch) */
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

/* 6. STICKY HEADER + PROGRESS BAR: one scroll listener does both jobs */
const header = document.querySelector('.top');
const bar    = Object.assign(document.createElement('div'), { id: 'progress' });
document.body.prepend(bar);
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  header.classList.toggle('small', scrollY > 40);            /* header shrinks after 40px */
  bar.style.width = (max > 0 ? scrollY / max * 100 : 0) + '%';
}, { passive: true });
