/* ============================================
   AgriCoop Digital Labs — Global JavaScript
   1. Header rendering
   2. Footer rendering
   3. Mobile navigation
   4. Active navigation
   5. Scroll effects
   6. Tabs
   7. Accordions
   8. Registration CTA
   9. Image error handling
   10. Page-specific init
   ============================================ */

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScSL_PknYfhz2UMT5vn9JjjZG0Ns88OLmtmGaiV_bXHfQtN6g/viewform";

(function () {
  'use strict';

  /* SVG icon set (line-style) */
  var icons = {
    erp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>',
    credit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
    mandi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V8l9-5 9 5v13"/><path d="M3 12h18M9 21V12M15 21V12"/></svg>',
    analytics: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 14l4-4 4 3 5-7"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 22v-4h4v4"/></svg>',
    bank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10M19 21V10M2 10l10-7 10 7"/><path d="M9 21v-6h6v6"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    document: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M5 21h14M12 6l-7 4 2 6h10l2-6z"/><path d="M12 6l7 4"/></svg>',
    gate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V5l9-3 9 3v16"/><path d="M9 21V12M15 21V12M3 12h18"/></svg>',
    auction: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
    sync: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-6.36 2.64L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9 9 0 0 0 6.36-2.64L21 16"/><path d="M21 21v-5h-5"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M1.88 4.94a18 18 0 0 1 20.24 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
    wifiOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l22 22"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.58 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-4.5 15.04-8.2 17.04z"/><path d="M2 21c0-3 1.85-5.36 5.17-6"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    chevronDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.36 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.34 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.78-.78a5.4 5.4 0 0 0-7.65 0A5.4 5.4 0 0 0 3.57 12l8.43 8.46L20.42 12a5.4 5.4 0 0 0 0-7.42z"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
    trendingUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>',
    warehouse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V8l9-5 9 5v13"/><path d="M7 21V13h10v8"/><path d="M10 13v8M14 13v8"/></svg>',
    coins: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>'
  };

  /* 1. Header rendering */
  var navLinks = [
    { href: 'index.html', label: 'Home' },
    { href: 'products.html', label: 'Products' },
    { href: 'solutions.html', label: 'Solutions' },
    { href: 'about.html', label: 'About' },
    { href: 'register.html', label: 'Register' }
  ];

  function getCurrentPage() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    return path;
  }

  function renderHeader() {
    var currentPage = getCurrentPage();
    var navHtml = navLinks.map(function (link) {
      var isActive = link.href === currentPage ? ' class="active"' : '';
      return '<a href="' + link.href + '"' + isActive + '>' + link.label + '</a>';
    }).join('');

    var html =
      '<header class="site-header" id="siteHeader">' +
        '<div class="header-inner">' +
          '<a href="index.html" class="logo" aria-label="AgriCoop Digital Labs home">' +
            '<img src="assets/logo.png" alt="AgriCoop Digital Labs logo" />' +
          '</a>' +
          '<nav class="nav" aria-label="Primary navigation">' + navHtml + '</nav>' +
          '<a href="register.html" class="btn btn-accent nav-cta">Register Now ' + icons.arrow + '</a>' +
          '<button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileNav">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</header>' +
      '<nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">' +
        navLinks.map(function (link) {
          var isActive = link.href === currentPage ? ' class="active"' : '';
          return '<a href="' + link.href + '"' + isActive + '>' + link.label + '</a>';
        }).join('') +
        '<a href="register.html" class="btn btn-accent btn-block">Register Now</a>' +
      '</nav>';

    var mount = document.getElementById('header-mount');
    if (mount) mount.innerHTML = html;
  }

  /* 2. Footer rendering */
  function renderFooter() {
    var html =
      '<footer class="site-footer">' +
        '<div class="container-wide">' +
          '<div class="footer-grid">' +
            '<div class="footer-brand">' +
              '<a href="index.html" class="logo-footer" aria-label="AgriCoop Digital Labs home">' +
                '<img src="assets/logo.png" alt="AgriCoop Digital Labs logo" />' +
              '</a>' +
              '<p>Digitizing India\'s agricultural cooperative ecosystem through integrated digital infrastructure for PACS, APMC mandis, and cooperative banks.</p>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4>Platform</h4>' +
              '<ul>' +
                '<li><a href="index.html">Home</a></li>' +
                '<li><a href="products.html">Products</a></li>' +
                '<li><a href="solutions.html">Solutions</a></li>' +
                '<li><a href="about.html">About</a></li>' +
              '</ul>' +
            '</div>' +
            '<div class="footer-col">' +
              '<h4>Solutions</h4>' +
              '<ul>' +
                '<li><a href="solutions.html#pacs">For PACS</a></li>' +
                '<li><a href="solutions.html#mandis">For APMC Mandis</a></li>' +
                '<li><a href="solutions.html#banks">For Cooperative Banks</a></li>' +
                '<li><a href="solutions.html#farmers">For Farmers</a></li>' +
              '</ul>' +
            '</div>' +
            '<div class="footer-col">' +
              '<div class="footer-cta">' +
                '<h4>Ready to digitize?</h4>' +
                '<p>Register your cooperative or mandi to join the digital ecosystem.</p>' +
                '<a href="register.html" class="btn btn-accent btn-block">Register Now</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<span>&copy; ' + new Date().getFullYear() + ' AgriCoop Digital Labs. All rights reserved.</span>' +
            '<span>Digital Agricultural Infrastructure</span>' +
          '</div>' +
        '</div>' +
      '</footer>' +
      '<button class="back-to-top" id="backToTop" aria-label="Back to top">' + icons.arrowUp + '</button>';

    var mount = document.getElementById('footer-mount');
    if (mount) mount.innerHTML = html;
  }

  /* 3. Mobile navigation */
  function initMobileNav() {
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* 5. Scroll effects */
  function initScrollEffects() {
    var header = document.getElementById('siteHeader');
    var backToTop = document.getElementById('backToTop');

    function onScroll() {
      var scrolled = window.scrollY > 10;
      if (header) header.classList.toggle('scrolled', scrolled);
      if (backToTop) backToTop.classList.toggle('show', window.scrollY > 600);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* Scroll reveal */
  function initScrollReveal() {
    var revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (!('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* Count-up animation */
  function initCountUp() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function animate(el, target, suffix) {
      var duration = 1600;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.floor(eased * target);
        el.textContent = value.toLocaleString('en-IN') + (suffix || '');
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString('en-IN') + (suffix || '');
        }
      }
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        animate(el, target, suffix);
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.getAttribute('data-suffix') || '';
          animate(el, target, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* 6. Tabs */
  function initTabs() {
    var tabContainers = document.querySelectorAll('[data-tabs]');
    tabContainers.forEach(function (container) {
      var tabs = container.querySelectorAll('.tab');
      var panels = container.querySelectorAll('.tab-panel');

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var target = tab.getAttribute('data-tab');
          tabs.forEach(function (t) {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');

          panels.forEach(function (panel) {
            panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
          });
        });
      });
    });
  }

  /* 7. Accordions */
  function initAccordions() {
    var accordions = document.querySelectorAll('[data-accordion]');
    accordions.forEach(function (acc) {
      var header = acc.querySelector('.accordion-header');
      if (!header) return;
      header.addEventListener('click', function () {
        var isOpen = acc.classList.toggle('open');
        header.setAttribute('aria-expanded', String(isOpen));
      });
    });
  }

  /* 8. Registration CTA */
  function initRegistrationCTA() {
    var cta = document.getElementById('registerGoogleFormCta');
    if (!cta) return;

    cta.href = GOOGLE_FORM_URL;
    cta.target = '_blank';
    cta.rel = 'noopener noreferrer';
  }

  /* 9. Image error handling */
  function initImageFallback() {
    document.querySelectorAll('img').forEach(function (img) {
      img.addEventListener('error', function () {
        if (img.dataset.fallback) return;
        img.dataset.fallback = 'true';
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('Image failed to load: ' + img.src);
        }
        var parent = img.parentElement;
        if (parent) {
          var fallback = document.createElement('div');
          fallback.className = 'img-fallback';
          fallback.style.width = img.getAttribute('width') || '100%';
          fallback.style.height = img.getAttribute('height') || '100%';
          fallback.style.minHeight = '200px';
          fallback.style.borderRadius = window.getComputedStyle(parent).borderRadius;
          fallback.textContent = img.alt || 'Image unavailable';
          parent.replaceChild(fallback, img);
        }
      });
    });
  }

  /* Concept UI bar animation */
  function initConceptBars() {
    var bars = document.querySelectorAll('.concept-ui-bar-fill');
    if (!bars.length || !('IntersectionObserver' in window)) {
      bars.forEach(function (b) { b.style.width = b.getAttribute('data-width'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute('data-width');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (b) { observer.observe(b); });
  }

  /* Smooth scroll for anchor links */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href === '#' || href.length < 2) return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerHeight = 80;
          var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* 10. Page-specific init */
  function init() {
    renderHeader();
    renderFooter();
    initMobileNav();
    initScrollEffects();
    initScrollReveal();
    initCountUp();
    initTabs();
    initAccordions();
    initRegistrationCTA();
    initImageFallback();
    initConceptBars();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
