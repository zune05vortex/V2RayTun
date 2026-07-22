/**
 * Vortex Digital Myanmar - Interactive UI Logic
 * Handles Smooth Scrolling, Sticky Navbar, Lightbox Modal Zoom, and Interactive Touches
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

    // 3. Interactive Image Zoom Modal (Lightbox Logic)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const imageWrappers = document.querySelectorAll('.image-wrapper');

    // Open Lightbox when any step image is clicked
    imageWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', () => {
            const imgSrc = wrapper.getAttribute('data-image');
            const captionText = wrapper.getAttribute('data-caption');

            if (imgSrc) {
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = captionText || '';
                
                // Show modal with fade-in
                lightbox.classList.remove('hidden');
                // Trigger reflow for CSS transition
                void lightbox.offsetWidth;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Function to close lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxImg.src = '';
            document.body.style.overflow = ''; // Restore scrolling
        }, 300); // Match CSS transition duration
    };

    // Close on X button click
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close on background (backdrop) click
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('backdrop-blur-md')) {
                closeLightbox();
            }
        });
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // 4. Copy to Clipboard Simulation / Feedback for Step 2 Copy Box
    const copyBox = document.querySelector('#step-2 .font-mono');
    if (copyBox) {
        copyBox.style.cursor = 'pointer';
        copyBox.title = 'Click to copy sample vless key';
        copyBox.addEventListener('click', () => {
            const sampleKey = "vless://a46890ef-fe6b-4cff-b4f8-b65628993c81@187.127.101.62:443?type=tcp&security=reality&pbk=Mq5qUM3K_jeGX8Cgbg0hY_tLESxdovwbKBfGpVys41I&fp=chrome&sni=amazon.com&sid=9dece5d16a&flow=xtls-rprx-vision#Vortex";
            navigator.clipboard.writeText(sampleKey).then(() => {
                const originalText = copyBox.innerHTML;
                copyBox.innerHTML = '<span class="text-emerald-400 font-sans font-bold flex items-center gap-1"><i class="fa-solid fa-check"></i> ကူးယူမှု အောင်မြင်ပါသည် (Copied!)</span>';
                setTimeout(() => {
                    copyBox.innerHTML = originalText;
                }, 2500);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // 5. Scroll IntersectionObserver for Step Cards Fade-In Animation
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
