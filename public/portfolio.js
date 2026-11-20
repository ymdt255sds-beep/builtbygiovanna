const toggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#primary-nav');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-label','Open navigation menu');
  nav.classList.remove('open');
}));
document.querySelector('#copyright-year').textContent = new Date().getFullYear();


document.addEventListener('keydown', event => { if(event.key === 'Escape' && nav.classList.contains('open')) {nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation menu');toggle.focus();} });
