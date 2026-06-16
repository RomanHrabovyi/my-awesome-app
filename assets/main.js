/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── Mobile menu ── */
const menuBtn   = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen  = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

menuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden', isOpen);
  iconOpen.classList.toggle('hidden', !isOpen);
  iconClose.classList.toggle('hidden', isOpen);
});

// Close on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Scroll reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Counter animation ── */
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, step);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const body = item.querySelector('.faq-body');
    const icon = btn.querySelector('.faq-icon');
    const isOpen = body.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-body.open').forEach(b => {
      b.classList.remove('open');
      b.closest('.faq-item').querySelector('.faq-icon').classList.remove('open');
    });

    // Toggle clicked
    if (!isOpen) {
      body.classList.add('open');
      icon.classList.add('open');
    }
  });
});

/* ── Pricing toggle ── */
const toggle = document.getElementById('billing-toggle');
const knob   = document.getElementById('toggle-knob');
const lblMonthly = document.getElementById('toggle-monthly');
const lblAnnual  = document.getElementById('toggle-annual');

let isAnnual = false;

toggle.addEventListener('click', () => {
  isAnnual = !isAnnual;
  knob.style.transform = isAnnual ? 'translateX(24px)' : 'translateX(0)';
  toggle.classList.toggle('bg-accent-500', isAnnual);
  toggle.classList.toggle('bg-brand-500', !isAnnual);

  lblMonthly.classList.toggle('text-gray-900', !isAnnual);
  lblMonthly.classList.toggle('text-gray-500', isAnnual);
  lblAnnual.classList.toggle('text-gray-900', isAnnual);
  lblAnnual.classList.toggle('text-gray-500', !isAnnual);

  document.querySelectorAll('.price-val').forEach(el => {
    const val = isAnnual ? el.dataset.annual : el.dataset.monthly;
    el.textContent = Number(val).toLocaleString('uk-UA');
  });
});

/* ── Contact form ── */
const form    = document.getElementById('contact-form');
const btnText = document.getElementById('form-btn-text');
const spinner = document.getElementById('form-spinner');
const success = document.getElementById('form-success');

form.addEventListener('submit', async e => {
  e.preventDefault();
  btnText.textContent = 'Відправляємо…';
  spinner.classList.remove('hidden');

  // Simulate async submit
  await new Promise(r => setTimeout(r, 1500));

  spinner.classList.add('hidden');
  btnText.textContent = 'Відправити заявку';
  success.classList.remove('hidden');
  form.reset();

  setTimeout(() => success.classList.add('hidden'), 5000);
});
