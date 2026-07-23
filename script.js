/**
 * Vortex Digital Myanmar - 100x Ultra Cyber-SaaS Logic
 * Powers: Neural Network Canvas, 3D Parallax Tilt, Dynamic Telemetry Ping, and Spotlight Tracking
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Live Telemetry Ping Simulator (Makes site feel "alive")
    const pingTimer = document.getElementById('ping-timer');
    if (pingTimer) {
        setInterval(() => {
            const pings = ['11ms', '12ms', '13ms', '12ms', '14ms', '11ms'];
            const randomPing = pings[Math.floor(Math.random() * pings.length)];
            pingTimer.textContent = randomPing;
        }, 3000);
    }

    // 2. Sticky Navbar & Live Reading Progress Bar
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-2xl', 'shadow-black/80', 'bg-vortex-dark/95');
            navbar.classList.remove('bg-vortex-dark/85');
        } else {
            navbar.classList.remove('shadow-2xl', 'shadow-black/80', 'bg-vortex-dark/95');
            navbar.classList.add('bg-vortex-dark/85');
        }

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        if (progressBar) {
            progressBar.style.width = scrollPercentage + '%';
        }
    });

    // 3. Smooth Navigation Scroll
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

    // 4. Mouse Spotlight Glow & Subtle 3D Perspective Parallax (Desktop Only)
    const tiltCards = document.querySelectorAll('.tilt-card');
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set variables for aurora spotlight
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Subtle 3D Tilt calculation (max 2.5 deg to preserve crisp photo readability)
            if (isDesktop) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -2.5;
                const rotateY = ((x - centerX) / centerX) * 2.5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            if (isDesktop) {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            }
        });
    });

    // 5. Zero-Dependency HTML5 Neural Network Particle Canvas (Hero Background)
    const canvas = document.getElementById('neural-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        const resizeCanvas = () => {
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(235, 160, 54, 0.6)';
                ctx.fill();
            }
        }

        // Initialize particle field (~35 nodes for optimal mobile performance)
        const particleCount = window.innerWidth < 640 ? 20 : 40;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animateCanvas = () => {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 130) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(217, 83, 30, ${0.25 * (1 - distance / 130)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        };

        animateCanvas();
    }

    // 6. Staggered Card Fade-In Animation
    const stepCards = document.querySelectorAll('.step-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    stepCards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.98)';
        card.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms, box-shadow 0.4s ease, border-color 0.4s ease`;
        observer.observe(card);
    });
});
