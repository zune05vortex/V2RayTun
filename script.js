/**
 * Vortex Digital Myanmar - Advanced Interactive UI Logic
 * Handles Cursor Spotlight Tracking, Scroll Progress Bar, and Staggered Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar & Shadow Effect on Scroll
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Navbar blur and shadow
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-xl', 'shadow-black/60', 'bg-vortex-dark/95');
            navbar.classList.remove('bg-vortex-dark/90');
        } else {
            navbar.classList.remove('shadow-xl', 'shadow-black/60', 'bg-vortex-dark/95');
            navbar.classList.add('bg-vortex-dark/90');
        }

        // Live Reading Progress Bar Calculation
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        if (progressBar) {
            progressBar.style.width = scrollPercentage + '%';
        }
    });

    // 2. Smooth Scrolling for Navigation Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Mouse-Following Cursor Spotlight Glow (Linear/Vercel Effect)
    const spotlightCards = document.querySelectorAll('.spotlight-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 4. Staggered Spring-Reveal on Scroll (IntersectionObserver)
    const stepCards = document.querySelectorAll('.step-card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stepCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(36px) scale(0.98)';
        // Staggered delay physics
        card.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms, box-shadow 0.4s ease, border-color 0.4s ease`;
        cardObserver.observe(card);
    });
});
