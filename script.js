document.documentElement.classList.add('js');

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.main-nav a')];
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  links.forEach((link) => link.toggleAttribute('aria-current', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-25% 0px -60%', threshold: [0, .25, .5] });
sections.forEach((section) => sectionObserver.observe(section));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion) {
  document.querySelectorAll('.reveal').forEach((item) => item.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));
}

document.getElementById('year').textContent = new Date().getFullYear();
