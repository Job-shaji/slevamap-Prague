const b=document.querySelector('.menu'),n=document.getElementById('nav');
b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
const list=document.getElementById('list');
if(list){const c=document.getElementById('cat'),a=document.getElementById('aud'),k=document.getElementById('count');
const h=location.hash.slice(1);if(h==='student'||h==='everyone')a.value=h;else if([...c.options].some(o=>o.value===h))c.value=h;
const f=()=>{let s=0;list.querySelectorAll('.deal').forEach(d=>{const ok=(c.value==='all'||d.dataset.cat===c.value)&&(a.value==='all'||d.dataset.aud===a.value);d.hidden=!ok;if(ok)s++});k.textContent=s+' deals shown'};
c.addEventListener('change',f);a.addEventListener('change',f);f()}
