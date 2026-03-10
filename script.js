document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;

    // 1. Intersection Observer for Scroll Reveals (Disabled on Mobile for perf)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (!isMobile) {
        document.querySelectorAll('.section-reveal').forEach(section => {
            revealObserver.observe(section);
        });
    } else {
        // Immediate reveal on mobile
        document.querySelectorAll('.section-reveal').forEach(section => {
            section.classList.add('visible');
        });
    }

    // 2. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 3. Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Navbar Background Change on Scroll (Disabled on Mobile for perf)
    const navbar = document.querySelector('.navbar');
    let scrollTicking = false;

    if (!isMobile) {
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > 50) {
                        navbar.style.boxShadow = '0 10px 30px rgba(0, 102, 255, 0.1)';
                        navbar.style.borderBottom = '1px solid rgba(0, 102, 255, 0.2)';
                    } else {
                        navbar.style.boxShadow = 'none';
                        navbar.style.borderBottom = '1px solid rgba(0, 102, 255, 0.1)';
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        });
    }

    // 5. Interactive Generator Logic
    const btnGenerate = document.getElementById('btn-generate');
    const generatorForm = document.getElementById('generator-form');
    const resultArea = document.getElementById('result-area');
    const genStatus = document.querySelector('.generating-status');
    const blurredQuestion = document.querySelector('.blurred-question');
    
    if (btnGenerate) {
        btnGenerate.addEventListener('click', () => {
            const banca = document.getElementById('select-banca').value;
            const nivel = document.getElementById('select-nivel').value;
            
            generatorForm.classList.add('hidden');
            resultArea.classList.remove('hidden');
            genStatus.classList.remove('hidden');
            blurredQuestion.classList.add('hidden');
            
            document.getElementById('res-banca').textContent = banca;
            document.getElementById('res-nivel').textContent = `Nível: ${nivel.charAt(0).toUpperCase() + nivel.slice(1)}`;
            
            setTimeout(() => {
                genStatus.classList.add('hidden');
                blurredQuestion.classList.remove('hidden');
            }, 2500);
        });
    }

    // 7. Interactive Feature Cards (3D Tilt) - Disabled on Mobile
    const featureItems = document.querySelectorAll('.feature-item');
    let tiltTicking = false;
    
    if (!isMobile) {
        featureItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                if (!tiltTicking) {
                    window.requestAnimationFrame(() => {
                        const rect = item.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;

                        const xPercent = (x / rect.width) * 100;
                        const yPercent = (y / rect.height) * 100;
                        item.style.setProperty('--mouse-x', `${xPercent}%`);
                        item.style.setProperty('--mouse-y', `${yPercent}%`);

                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = (centerY - y) / 10;
                        const rotateY = (x - centerX) / 10;

                        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                        tiltTicking = false;
                    });
                    tiltTicking = true;
                }
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
            });
        });
    }
});
