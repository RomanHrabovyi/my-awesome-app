/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── Mobile menu ── */
const menuBtn    = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen   = document.getElementById('icon-open');
const iconClose  = document.getElementById('icon-close');

menuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden', isOpen);
  iconOpen.classList.toggle('hidden', !isOpen);
  iconClose.classList.toggle('hidden', isOpen);
});

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
  const duration = 1400;
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

    document.querySelectorAll('.faq-body.open').forEach(b => {
      b.classList.remove('open');
      b.closest('.faq-item').querySelector('.faq-icon').classList.remove('open');
    });

    if (!isOpen) {
      body.classList.add('open');
      icon.classList.add('open');
    }
  });
});

/* ── Testimonial slider ── */
const slidesTrack = document.getElementById('testimonial-slides');
const slides       = document.querySelectorAll('.testimonial-slide');
const dotsWrap     = document.getElementById('testimonial-dots');
const prevBtn      = document.getElementById('t-prev');
const nextBtn      = document.getElementById('t-next');
let current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Відгук ${i + 1}`);
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);
});

function goTo(index) {
  current = (index + slides.length) % slides.length;
  slidesTrack.style.transform = `translateX(-${current * 100}%)`;
  dotsWrap.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === current));
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

let autoplay = setInterval(() => goTo(current + 1), 6000);
[prevBtn, nextBtn].forEach(btn => btn.addEventListener('click', () => {
  clearInterval(autoplay);
  autoplay = setInterval(() => goTo(current + 1), 6000);
}));

/* ── Booking widget ── */
const bookingForm = document.getElementById('booking-form');
bookingForm.addEventListener('submit', e => {
  e.preventDefault();
  document.querySelector('#rooms').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ── Contact form ── */
const form    = document.getElementById('contact-form');
const btnText = document.getElementById('form-btn-text');
const spinner = document.getElementById('form-spinner');
const success = document.getElementById('form-success');

form.addEventListener('submit', async e => {
  e.preventDefault();
  btnText.textContent = 'Надсилаємо…';
  spinner.classList.remove('hidden');

  await new Promise(r => setTimeout(r, 1200));

  spinner.classList.add('hidden');
  btnText.textContent = 'Надіслати заявку';
  success.classList.remove('hidden');
  form.reset();

  setTimeout(() => success.classList.add('hidden'), 5000);
});
