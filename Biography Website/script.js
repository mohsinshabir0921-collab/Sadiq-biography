/**
 * MOHAMMAD SADIQ PASWAL - APPLE-GRADE GSAP MOTION ENGINE
 * Production-Ready JavaScript (ES6+ / GSAP 3 / ScrollTrigger)
 */

document.addEventListener('DOMContentLoaded', () => {

    // Register GSAP Plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    /* --------------------------------------------------------------------------
       1. Custom Gold Cursor & Magnetic Interaction
       -------------------------------------------------------------------------- */
    const cursorDot = document.getElementById('cursorDot');
    const cursorFollower = document.getElementById('cursorFollower');

    if (cursorDot && cursorFollower && window.innerWidth > 1024) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        const xToDot = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power2.out" });
        const yToDot = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power2.out" });
        const xToFollower = gsap.quickTo(cursorFollower, "x", { duration: 0.35, ease: "power3.out" });
        const yToFollower = gsap.quickTo(cursorFollower, "y", { duration: 0.35, ease: "power3.out" });

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            xToDot(mouseX);
            yToDot(mouseY);
            xToFollower(mouseX);
            yToFollower(mouseY);
        });

        // Magnetic Pull Effects on Interactive Items
        const magneticItems = document.querySelectorAll('.magnetic-item');
        magneticItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(cursorFollower, {
                    scale: 1.6,
                    backgroundColor: 'rgba(197, 160, 89, 0.15)',
                    borderColor: 'var(--gold-light)',
                    duration: 0.3
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(cursorFollower, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(197, 160, 89, 0.5)',
                    duration: 0.3
                });
                gsap.to(item, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
            });

            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const relX = e.clientX - rect.left - rect.width / 2;
                const relY = e.clientY - rect.top - rect.height / 2;
                gsap.to(item, {
                    x: relX * 0.18,
                    y: relY * 0.18,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    }

    /* --------------------------------------------------------------------------
       2. Sticky Navbar & Mobile Drawer
       -------------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const allNavAnchors = document.querySelectorAll('.nav-link');

    const handleNavbarScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    const toggleMobileMenu = () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    };

    const closeMobileMenu = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
    allNavAnchors.forEach(link => link.addEventListener('click', closeMobileMenu));

    /* --------------------------------------------------------------------------
       3. GSAP Hero Entrance & Parallax Scrub Animation
       -------------------------------------------------------------------------- */
    if (typeof gsap !== 'undefined') {
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

        heroTl.from('#navbar', {
            y: -30,
            opacity: 0,
            duration: 1
        })
        .from('.reveal-hero', {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.9
        }, "-=0.6")
        .from('.reveal-hero-visual', {
            scale: 0.94,
            opacity: 0,
            duration: 1.1
        }, "-=0.8");

        // Parallax scrub on Hero Image as page scrolls down
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.to('.hero-img', {
                scrollTrigger: {
                    trigger: '#hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                scale: 1.1,
                y: 50,
                ease: 'none'
            });
        }
    }

    /* --------------------------------------------------------------------------
       4. Animated Counter Stats
       -------------------------------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-number');
    let animatedStats = false;

    const runCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            gsap.to(stat, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: "power2.out"
            });
        });
    };

    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
            trigger: '.hero-stats',
            start: 'top 85%',
            onEnter: () => {
                if (!animatedStats) {
                    animatedStats = true;
                    runCounters();
                }
            }
        });
    }

    /* --------------------------------------------------------------------------
       5. ScrollTrigger General Section Reveal Animations
       -------------------------------------------------------------------------- */
    if (typeof ScrollTrigger !== 'undefined') {

        // Generic Element Reveals
        gsap.utils.toArray('.gsap-reveal').forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    toggleActions: 'play none none none'
                },
                y: 35,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out'
            });
        });

        // Section Title Lines Reveal (Scale horizontal)
        gsap.utils.toArray('.gsap-line').forEach(line => {
            gsap.from(line, {
                scrollTrigger: {
                    trigger: line,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                scaleX: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // About Cards & Pillars Reveal
        gsap.from('.gsap-card-left', {
            scrollTrigger: {
                trigger: '.about-grid',
                start: 'top 80%'
            },
            x: -40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from('.gsap-pillar', {
            scrollTrigger: {
                trigger: '.about-pillars',
                start: 'top 82%'
            },
            x: 40,
            opacity: 0,
            stagger: 0.2,
            duration: 0.9,
            ease: 'power3.out'
        });

        // Timeline Progress Line Scrub
        const timelineProgress = document.getElementById('timelineProgress');
        if (timelineProgress) {
            gsap.to(timelineProgress, {
                scrollTrigger: {
                    trigger: '.timeline',
                    start: 'top 70%',
                    end: 'bottom 70%',
                    scrub: true
                },
                height: '100%',
                ease: 'none'
            });
        }

        // Timeline Items Stagger Reveal
        gsap.utils.toArray('.gsap-timeline').forEach(item => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        // Gallery Cards Grid Stagger
        gsap.from('.gsap-gallery-card', {
            scrollTrigger: {
                trigger: '.gallery-grid',
                start: 'top 82%'
            },
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: 'power3.out'
        });

        // Contact Form Slide In
        gsap.from('.gsap-card-right', {
            scrollTrigger: {
                trigger: '.contact-grid',
                start: 'top 80%'
            },
            x: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        /* --------------------------------------------------------------------------
           6. Apple-Style Text Highlight Scrub on Quote Section
           -------------------------------------------------------------------------- */
        const quoteWords = document.querySelectorAll('.quote-word');
        if (quoteWords.length > 0) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '#quoteBanner',
                    start: 'top 75%',
                    end: 'bottom 50%',
                    scrub: 0.5
                }
            })
            .to(quoteWords, {
                color: '#ffffff',
                stagger: 0.05,
                ease: 'none'
            });
        }
    }

    /* --------------------------------------------------------------------------
       7. Gallery Filtering System
       -------------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.94,
                        y: 20,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    /* --------------------------------------------------------------------------
       8. Lightbox Modal Functionality
       -------------------------------------------------------------------------- */
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxLocation = document.getElementById('lightboxLocation');
    const lightboxDesc = document.getElementById('lightboxDesc');

    const openLightbox = (card) => {
        const imgSrc = card.querySelector('img').getAttribute('src');
        const title = card.getAttribute('data-title');
        const location = card.getAttribute('data-location');
        const desc = card.getAttribute('data-desc');

        lightboxImg.setAttribute('src', imgSrc);
        lightboxImg.setAttribute('alt', title);
        lightboxTitle.textContent = title;
        lightboxLocation.textContent = location;
        lightboxDesc.textContent = desc;

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        gsap.fromTo('.lightbox-content', 
            { scale: 0.92, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
    };

    const closeLightbox = () => {
        gsap.to('.lightbox-content', {
            scale: 0.94,
            opacity: 0,
            y: 10,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
                lightboxModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    };

    galleryCards.forEach(card => {
        card.addEventListener('click', () => openLightbox(card));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });

    /* --------------------------------------------------------------------------
       9. Contact Form Handling
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const formNotice = document.getElementById('formNotice');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Transmitting Message...</span>`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                formNotice.className = 'form-notice success';
                formNotice.textContent = 'Thank you. Your message has been transmitted successfully to Mohammad Sadiq Paswal.';
                
                contactForm.reset();

                setTimeout(() => {
                    formNotice.style.display = 'none';
                }, 6000);
            }, 1200);
        });
    }

    /* --------------------------------------------------------------------------
       10. Back to Top Button
       -------------------------------------------------------------------------- */
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    const headerOffset = 90;
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    const mobileMenu = document.querySelector(".mobile-menu, .nav-menu, .navbar-menu");
    const mobileToggle = document.querySelector(".menu-toggle, .nav-toggle, .hamburger");

    if (mobileMenu) {
      mobileMenu.classList.remove("active", "open");
    }

    if (mobileToggle) {
      mobileToggle.classList.remove("active", "open");
    }
  });
});
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "service_45xx6it",
        "template_iken6ay",
        this
    ).then(function () {
        alert("Message Sent Successfully!");
        document.getElementById("contactForm").reset();
    }, function (error) {
        alert("Failed to send message!");
        console.log(error);
    });
});