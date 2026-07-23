/**
 * Vortex Digital Myanmar - Interactive UI Logic
 * Handles Smooth Scrolling and Sticky Navbar
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar Shadow & Blur Effect on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-xl', 'shadow-black/50', 'bg-vortex-dark/95');
            navbar.classList.remove('bg-vortex-dark/90');
        } else {
            navbar.classList.remove('shadow-xl', 'shadow-black/50', 'bg-vortex-dark/95');
            navbar.classList.add('bg-vortex-dark/90');
        }
    });

    // 2. Smooth Scrolling for Navigation & Anchor Links
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

    // 3. Scroll IntersectionObserver for Step Cards Fade-In Animation
    const stepCards = document.querySelectorAll('.step-card');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stepCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(24px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease';
        cardObserver.observe(card);
    });
});
