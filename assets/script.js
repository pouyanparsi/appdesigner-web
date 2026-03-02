/**
 * App Designer Group — script.js
 * Minimal, vanilla JS enhancements
 */

(function () {
    'use strict';

    /* ---- Navbar scroll shadow ---- */
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    /* ---- Active nav link (by pathname) ---- */
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ---- Fade-up on scroll (IntersectionObserver) ---- */
    const fadeEls = document.querySelectorAll('.fade-up');
    if ('IntersectionObserver' in window && fadeEls.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, i * 80);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        fadeEls.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all immediately
        fadeEls.forEach(el => el.classList.add('visible'));
    }

    /* ---- Smooth collapse close on mobile link click ---- */
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    const toggler = document.querySelector('.navbar-toggler');
                    if (toggler) toggler.click();
                }
            });
        });
    }

    /* ---- Counter animation for stat numbers ---- */
    function animateCounter(el) {
        const target = parseInt(el.dataset.target || el.textContent.replace(/\D/g, ''), 10);
        const suffix = el.dataset.suffix || el.textContent.replace(/[0-9]/g, '');
        const duration = 1800;
        const step = 16;
        const increment = target / (duration / step);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current) + suffix;
        }, step);
    }

    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(el => counterObserver.observe(el));
    }

})();
