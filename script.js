/* First Brazil — Main Script */

document.documentElement.classList.add('js');

(function () {
  'use strict';

  // ---- Navigation scroll effect ----
  const nav = document.getElementById('nav');

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 48);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ---- Mobile menu ----
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
    }
  });

  // ---- Scroll-reveal animations ----
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = nav.offsetHeight + 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---- Form handling ----
  function handleForm(form, feedbackId) {
    if (!form) return;

    const feedback = document.getElementById(feedbackId);
    const defaultFeedbackText = feedback ? feedback.textContent : '';

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const input = form.querySelector('input[type="email"]');
      const button = form.querySelector('button[type="submit"]');

      if (!input || !input.value.trim()) {
        input.focus();
        return;
      }

      const email = input.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (feedback) {
          feedback.textContent = 'Please enter a valid email address.';
          feedback.style.color = '#eb5252';
        }
        input.focus();
        return;
      }

      const originalButtonText = button.textContent;
      button.textContent = 'Sending…';
      button.disabled = true;
      input.disabled = true;

      // Simulate async submission
      setTimeout(() => {
        button.textContent = 'Sent!';
        input.value = '';

        if (feedback) {
          feedback.textContent = "We'll be in touch within 24 hours.";
          feedback.style.color = '';
        }

        setTimeout(() => {
          button.textContent = originalButtonText;
          button.disabled = false;
          input.disabled = false;
          if (feedback) {
            feedback.textContent = defaultFeedbackText;
          }
        }, 3000);
      }, 900);
    });
  }

  handleForm(document.getElementById('hero-form'), 'hero-feedback');
  handleForm(document.getElementById('contact-form'), 'contact-feedback');

})();
