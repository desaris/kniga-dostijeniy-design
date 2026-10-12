const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}));

const modal = document.querySelector('#proposal-modal');
const openers = document.querySelectorAll('[data-open-modal]');
const closers = document.querySelectorAll('[data-close-modal]');

function setModal(open) {
  if (!modal) return;
  modal.classList.toggle('is-open', open);
  modal.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('modal-open', open);
  if (open) modal.querySelector('input')?.focus();
}

openers.forEach((button) => button.addEventListener('click', () => setModal(true)));
closers.forEach((button) => button.addEventListener('click', () => setModal(false)));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setModal(false); });

document.querySelectorAll('.filter').forEach((filter) => {
  filter.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
