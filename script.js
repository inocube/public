(function () {
  'use strict';

  // ——— Lucide icons ———
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ——— Navbar scroll ———
  var navbar = document.getElementById('navbar');
  if (navbar) {
    var scrollThreshold = 50;
    function updateNavbar() {
      if (window.scrollY > scrollThreshold) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
  }

  // ——— Mobile menu ———
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.querySelector('.navbar__nav');
  var navLinks = document.querySelectorAll('.navbar__link');
  var toggleIcon = navToggle && navToggle.querySelector('[data-lucide]');
  function setToggleIcon(open) {
    if (toggleIcon && typeof lucide !== 'undefined') {
      toggleIcon.setAttribute('data-lucide', open ? 'x' : 'menu');
      lucide.createIcons();
    }
  }
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('navbar__nav--open');
      navToggle.setAttribute('aria-expanded', open);
      setToggleIcon(open);
    });
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('navbar__nav--open');
        if (navToggle) {
          navToggle.setAttribute('aria-expanded', 'false');
          setToggleIcon(false);
        }
      });
    });
  }

  // ——— Smooth scroll na sekcie ———
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    var href = anchor.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (!target) return;
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ——— Intersection Observer: reveal animácie ———
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
          }
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  }

  // ——— Rok do footera ———
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
