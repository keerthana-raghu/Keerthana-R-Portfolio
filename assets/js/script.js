// ========================================
// PERFORMANCE OPTIMIZATION - Detect device capabilities
// ========================================

let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ========================================
// NAVIGATION
// ========================================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    const isExpanded = navLinks.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);

    if (isExpanded) {
        const focusableElements = navLinks.querySelectorAll('a');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            } else if (e.key === 'Escape') {
                closeMenu();
                hamburger.focus();
            }
        };
        navLinks.addEventListener('keydown', handleKeyDown);
        navLinks._focusTrapHandler = handleKeyDown;
        const firstLink = navLinks.querySelector('a');
        if (firstLink) firstLink.focus();
    } else {
        if (navLinks._focusTrapHandler) {
            navLinks.removeEventListener('keydown', navLinks._focusTrapHandler);
            delete navLinks._focusTrapHandler;
        }
    }
}

function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');

    if (navLinks._focusTrapHandler) {
        navLinks.removeEventListener('keydown', navLinks._focusTrapHandler);
        delete navLinks._focusTrapHandler;
    }
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMenu);
}

if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        closeMenu();
    }
});

let lastNavWidth = window.innerWidth;
window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    if (currentWidth > 1023 && lastNavWidth <= 1023) {
        if (navLinks && navLinks.classList.contains('active')) {
            closeMenu();
        }
    }
    if (currentWidth !== lastNavWidth) {
        lastNavWidth = currentWidth;
    }
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // The skip link keeps the browser's own fragment jump, because that jump is
    // what moves keyboard focus to <main tabindex="-1">. Intercepting it here
    // (as every other in-page link is, to offset the fixed navbar) cancelled
    // the focus move and left focus on the skip link itself.
    if (anchor.classList.contains('skip-link')) return;
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') {
          e.preventDefault();
          return;
        }

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT (throttled)
// ========================================

const navbar = document.querySelector('.navbar');
let navbarTicking = false;

function updateNavbar() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    navbarTicking = false;
}

window.addEventListener('scroll', () => {
    if (!navbarTicking) {
        requestAnimationFrame(updateNavbar);
        navbarTicking = true;
    }
}, { passive: true });

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a');

    // Reference line at 35% of the viewport height: the section under it is the
    // one being read. (The old rule compared each section's top to the navbar
    // height, so short sections never became active and the previous link stuck.)
    const line = window.scrollY + window.innerHeight * 0.35;
    let currentSection = '';

    sections.forEach(section => {
        const top = section.offsetTop;
        if (line >= top && line < top + section.offsetHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Bottom of the page: the last section can start below the line.
    if (!currentSection && sections.length &&
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        currentSection = sections[sections.length - 1].getAttribute('id');
    }

    // Tools & Tech is a sub-section of Skills and has no nav link of its own:
    // keep SKILLS highlighted while it is on screen instead of clearing it.
    const navTarget = currentSection === 'technical-skills' ? 'skills' : currentSection;

    navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${navTarget}`) {
            link.classList.add('active');
        }
    });
}

// Highlight the current section on first paint, not only after a scroll.
updateActiveNavLink();
window.addEventListener('load', updateActiveNavLink);

let navTicking = false;
window.addEventListener('scroll', () => {
    if (!navTicking) {
        requestAnimationFrame(() => {
            updateActiveNavLink();
            navTicking = false;
        });
        navTicking = true;
    }
}, { passive: true });

const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// REUSABLE CAROUSEL FACTORY
// ========================================

/**
 * Initializes an infinite-scroll carousel.
 *
 * @param {Object} config
 * @param {string} config.trackId         - ID of the carousel track element
 * @param {string} config.cardSelector    - CSS selector for original cards within the track
 * @param {string} config.cloneClass      - Class name added to cloned cards
 * @param {boolean} config.showDots       - When true, renders clickable position dots
 */
function initScrollCarousel(config) {
    var track = document.getElementById(config.trackId);
    if (!track) return;
    var container = track.parentElement;
    if (!container) return;

    var cards = Array.from(track.querySelectorAll(config.cardSelector));
    if (cards.length === 0) return;

    // Duplicate the card set once for a seamless infinite loop (skip under reduced motion)
    if (!prefersReducedMotion) {
        cards.forEach(function(card) {
            var clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clone.classList.add(config.cloneClass);
            clone.setAttribute('tabindex', '-1');
            track.appendChild(clone);

            var focusable = clone.querySelectorAll('a, button, [tabindex]');
            focusable.forEach(function(el) {
                el.setAttribute('tabindex', '-1');
                el.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                }, true);
            });
        });
    }

    var isPaused = false;
    var isDragging = false;
    var autoScrollEnabled = !prefersReducedMotion;

    function loopPoint() {
        var firstClone = track.querySelector('.' + config.cloneClass);
        if (firstClone) {
            return firstClone.getBoundingClientRect().left - track.getBoundingClientRect().left;
        }
        return track.scrollWidth;
    }

    // Autoplay stepping: advance ONCE PER ANIMATION FRAME with a time-scaled
    // delta instead of a fixed setInterval. A fixed30ms interval aliases against
    // display vsync (60/120/144Hz) and scrollLeft snaps to the device-pixel
    // grid, so motion rendered as uneven multi-pixel hops (visible jerk).
    // Per-frame, time-based steps stay <=1 CSS px and read as continuous.
    if (autoScrollEnabled) {
        var lastFrameTime = null;
        requestAnimationFrame(function tick(now) {
            if (lastFrameTime === null) lastFrameTime = now;
            var dt = now - lastFrameTime;
            lastFrameTime = now;
            // dt > 100ms means the tab was hidden/suspended: skip that frame
            // instead of lurching forward on return.
            if (!isPaused && !isDragging && dt > 0 && dt <= 100) {
                var loop = loopPoint();
                if (loop > container.clientWidth) {
                    var next = container.scrollLeft + config.speed * (dt / 30);
                    container.scrollLeft = next >= loop ? next - loop : next;
                }
            }
            requestAnimationFrame(tick);
        });
    }

    // Pause auto-scroll while the pointer is over the carousel
    container.addEventListener('mouseenter', function() { isPaused = true; });
    container.addEventListener('mouseleave', function() { isPaused = false; });

    // Pause while touching (native swipe handles scrolling)
    container.addEventListener('touchstart', function() { isPaused = true; }, { passive: true });
    container.addEventListener('touchend', function() { isPaused = false; }, { passive: true });
    container.addEventListener('touchcancel', function() { isPaused = false; }, { passive: true });

    // Wheel / trackpad -> horizontal scroll ONLY for horizontal intent.
    // Vertical scroll (up/down) is left for the page.
    container.addEventListener('wheel', function(e) {
        var loop = loopPoint();
        if (loop <= container.clientWidth) return;
        var horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
        if (!horizontal) return;
        e.preventDefault();
        var delta = e.shiftKey ? e.deltaY : e.deltaX;
        var target = container.scrollLeft + delta;
        if (target >= loop) {
            target -= loop;
        } else if (target < 0) {
            target += loop;
        }
        container.scrollLeft = target;
    }, { passive: false });

    // Mouse drag-to-scroll (desktop)
    var startX = 0;
    var startScroll = 0;
    var moved = false;
    // Track whether a real swipe/drag (not a plain click) is in progress,
    // so that links inside the carousel (e.g. the cert "View Credential" button)
    // always remain clickable on mouse/pointer devices.
    container.addEventListener('pointerdown', function(e) {
        if (e.pointerType === 'touch') return;
        isDragging = true;
        moved = false;
        startX = e.clientX;
        startScroll = container.scrollLeft;
        // Do NOT capture the pointer here. Capturing swallows the browser's
        // click delivery to interactive elements (links/buttons) on mouse devices,
        // which made the cert "View Credential" button register as a drag instead
        // of a click. Native scrolling still works without capture.
    });

    container.addEventListener('pointermove', function(e) {
        if (!isDragging) return;
        var dx = e.clientX - startX;
        // Only register a real drag when the pointer has travelled a clear distance.
        // A plain click (even with a few px of jitter) is NOT a drag.
        if (Math.abs(dx) > 10) moved = true;
        container.scrollLeft = startScroll - dx;
    });

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
    }

    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);

    // Prevent the card's click after a drag, BUT never cancel clicks that land
    // on a real link/anchor (like the cert "View Credential" button). This keeps
    // the button fully clickable on mouse/pointer screens while still stopping
    // accidental navigation after swiping the carousel.
    container.addEventListener('click', function(e) {
        var onLink = e.target && e.target.closest && e.target.closest('a');
        if (moved && !onLink) {
            e.preventDefault();
            e.stopPropagation();
        }
        moved = false;
    }, true);

    // Pause when the carousel scrolls out of view
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                isPaused = !entry.isIntersecting;
            });
        }, { threshold: 0.1 });
        observer.observe(container);
    }

    // ========================================
    // POSITION DOTS (optional) - smooth, scroll-synced
    // ========================================
    if (config.showDots) {
        // Use the pre-clone card list so we get exactly one dot per real card
        var originalCards = cards;
        var totalDots = originalCards.length;

        // Container for the dots, placed right below the carousel
        var dotsWrap = document.createElement('div');
        dotsWrap.className = 'carousel-dots';

        var dots = [];
        for (var di = 0; di < totalDots; di++) {
            (function(index) {
                var dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Go to item ' + (index + 1));
                dot.addEventListener('click', function() {
                    if (totalDots <= 1) return;
                    // Pause continuous autoplay so the jump is clean
                    isPaused = true;
                    var original = originalCards[index];
                    var target = original.offsetLeft;
                    // JS-eased jump instead of scrollTo({behavior:'smooth'}):
                    // Chrome's native smooth scroll crawls linearly without
                    // easing on this scroller when the pointer is off the
                    // container (~100px/s measured), so animate the scroll
                    // ourselves with a time-based ease-in-out over ~500ms.
                    var from = container.scrollLeft;
                    var startTime = null;
                    var duration = 500;
                    requestAnimationFrame(function easeTo(now) {
                        if (startTime === null) startTime = now;
                        var t = Math.min((now - startTime) / duration, 1);
                        var e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                        container.scrollLeft = from + (target - from) * e;
                        if (t < 1) requestAnimationFrame(easeTo);
                    });
                });
                dots.push(dot);
                dotsWrap.appendChild(dot);
            })(di);
        }
        container.parentElement.insertBefore(dotsWrap, container.nextSibling);

        // Compute card step from the first original card + gap
        function cardStep() {
            if (originalCards.length === 0) return 1;
            var first = originalCards[0];
            var gap = parseFloat(getComputedStyle(track).gap) || 0;
            return (first.offsetWidth || 1) + gap;
        }

        // Map scrollLeft -> active dot index (respects the clone loop)
        function syncDots() {
            if (totalDots <= 1) {
                return;
            }
            var step = cardStep();
            if (!step) return;
            var pos = container.scrollLeft;
            var idx = Math.round(pos / step);
            // Clamp into [0, totalDots-1]; when reaching the clone set, wrap to start
            idx = ((idx % totalDots) + totalDots) % totalDots;
            for (var k = 0; k < dots.length; k++) {
                dots[k].classList.toggle('active', k === idx);
            }
        }

        var dotTicking = false;
        container.addEventListener('scroll', function() {
            if (!dotTicking) {
                requestAnimationFrame(function() {
                    syncDots();
                    dotTicking = false;
                });
                dotTicking = true;
            }
        }, { passive: true });

        var dotResizeTimer = null;
        window.addEventListener('resize', function() {
            clearTimeout(dotResizeTimer);
            dotResizeTimer = setTimeout(syncDots, 120);
        });

        syncDots();
    }
}

// ========================================
// CAROUSEL INITIALIZATION
// ========================================

initScrollCarousel({
    trackId: 'certCarouselTrack',
    cardSelector: '.cert-card',
    cloneClass: 'cert-card-clone',
    speed: 1.5,
    showDots: true
});

initScrollCarousel({
    trackId: 'skillsCarouselTrack',
    cardSelector: '.skill-card',
    cloneClass: 'skill-card-clone',
    speed: 1.5,
    showDots: true
});

// ========================================
// MOBILE PROJECTS CAROUSEL AUTO-SCROLL
// ========================================
(function() {
    var projectsCarousel = document.querySelector('.projects-carousel');
    var projectsTrack = document.getElementById('projectsCarouselTrack');
    if (!projectsCarousel || !projectsTrack || prefersReducedMotion) return;

    var scrollInterval = null;
    var isPaused = false;

    function startAutoScroll() {
        if (!isMobile || isPaused) return;
        stopAutoScroll();
        scrollInterval = setInterval(function() {
            var cardWidth = projectsCarousel.querySelector('.project-card');
            if (!cardWidth) return;
            var scrollAmount = cardWidth.offsetWidth + parseFloat(getComputedStyle(projectsTrack).gap) || 16;
            var maxScroll = projectsTrack.scrollWidth - projectsCarousel.clientWidth;

            if (projectsCarousel.scrollLeft >= maxScroll - 5) {
                projectsCarousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                projectsCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 2000);
    }

    function stopAutoScroll() {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
        }
    }

    // Touch: pause on touch, resume immediately (0ms) after touchend
    projectsCarousel.addEventListener('touchstart', function() {
        isPaused = true;
        stopAutoScroll();
    }, { passive: true });

    projectsCarousel.addEventListener('touchend', function() {
        isPaused = false;
        startAutoScroll();
    }, { passive: true });

    projectsCarousel.addEventListener('touchcancel', function() {
        isPaused = false;
        startAutoScroll();
    }, { passive: true });

    // Mouse: pause on enter, resume immediately on leave
    projectsCarousel.addEventListener('mouseenter', function() {
        isPaused = true;
        stopAutoScroll();
    });

    projectsCarousel.addEventListener('mouseleave', function() {
        isPaused = false;
        startAutoScroll();
    });

    // Resume auto-scroll when returning from another tab
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible' && isMobile) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
    });

    function onResize() {
        var wasMobile = isMobile;
        isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        if (isMobile && !wasMobile) {
            startAutoScroll();
        } else if (!isMobile && wasMobile) {
            stopAutoScroll();
        }
    }

    window.addEventListener('resize', onResize, { passive: true });

    if (isMobile) {
        setTimeout(startAutoScroll, 1500);
    }
})();

// Sections render fully at load. One-shot screenshot tools (Google Inspection
// Tool, PageSpeed thumbnails) never scroll, so a scroll-gated reveal left the
// whole page blank for them.

if (!isMobile) {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

const touchElements = document.querySelectorAll('.education-card, .experience-card, .project-card, .stat, .contact-item, .skill-card, .strength-item, .skill-tag, .language-item');

touchElements.forEach(el => {
    el.addEventListener('touchstart', function(e) {
        this.style.transform = 'scale(0.98)';
        this.style.boxShadow = '0 4px 12px rgba(27, 36, 49, 0.12)';
        if (this.classList.contains('education-card') || this.classList.contains('experience-card')) {
            this.style.transform = 'scale(0.98) translateX(2px)';
        }
        if (this.classList.contains('project-card')) {
            this.style.transform = 'scale(0.98) translateY(-1px)';
            this.classList.add('touched');
        }
        if (this.classList.contains('contact-item')) {
            this.style.transform = 'scale(0.98) translateX(2px)';
            this.style.background = 'var(--canvas)';
        }
    }, { passive: true });

    el.addEventListener('touchend', function(e) {
        this.style.transform = '';
        this.style.boxShadow = '';
        this.classList.remove('touched');
        if (this.classList.contains('contact-item')) {
            this.style.background = '';
        }
    }, { passive: true });

    el.addEventListener('touchcancel', function(e) {
        this.style.transform = '';
        this.style.boxShadow = '';
        this.classList.remove('touched');
        if (this.classList.contains('contact-item')) {
            this.style.background = '';
        }
    }, { passive: true });

    el.addEventListener('blur', function() {
        this.classList.remove('touched');
    }, { passive: true });
});

// Cert card touch feedback (handled separately for carousel compat)
document.querySelectorAll('.cert-card').forEach(function(card) {
    card.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
        this.style.boxShadow = '0 4px 12px rgba(27, 36, 49, 0.12)';
    }, { passive: true });

    card.addEventListener('touchend', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
        this.style.background = '';
    }, { passive: true });

    card.addEventListener('touchcancel', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
        this.style.background = '';
    }, { passive: true });
});

// Visibility change handler - remove touched class when returning to page
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        document.querySelectorAll('.touched').forEach(el => {
            el.classList.remove('touched');
        });
    }
});

window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        document.querySelectorAll('.touched').forEach(el => {
            el.classList.remove('touched');
        });
    }
});

// Skill card touch feedback (handled separately for skills carousel compat)
document.querySelectorAll('.skill-card').forEach(function(card) {
    card.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
        this.style.boxShadow = '0 4px 12px rgba(27, 36, 49, 0.12)';
    }, { passive: true });

    card.addEventListener('touchend', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
        this.style.background = '';
    }, { passive: true });

    card.addEventListener('touchcancel', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
        this.style.background = '';
    }, { passive: true });
});

const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const hasPlus = text.includes('+');
            const number = parseInt(text.replace(/[^0-9]/g, ''));

            if (/^\d{4}$/.test(text.trim()) && !hasPlus) {
                target.textContent = text;
                counterObserver.unobserve(target);
                return;
            }

            let current = 0;
            const increment = number / 50;
            const duration = 800;
            const stepTime = duration / 50;

            const counter = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(counter);
                }
                target.textContent = Math.round(current) + (hasPlus ? '+' : '');
            }, stepTime);

            counterObserver.unobserve(target);
        }
    });
}, {
    threshold: 0.5
});

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

window.addEventListener('load', () => {
    document.documentElement.classList.add('js-loaded');

    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ========================================
    // RESUME CACHE-BUSTING - Force all devices to load the latest PDF
    // ========================================
    // Append a version timestamp to Resume.pdf links to bypass aggressive
    // browser caching (especially on mobile devices). When you update
    // Resume.pdf, simply update the VERSION string below and re-deploy.
    // The timestamp ensures every device fetches the fresh file.
    (function() {
        var resumeVersion = 'v2';
        var resumeLinks = document.querySelectorAll('a[href="assets/docs/Resume.pdf"]');
        for (var i = 0; i < resumeLinks.length; i++) {
            var link = resumeLinks[i];
            link.href = 'assets/docs/Resume.pdf' + '?v=' + resumeVersion;
        }
    })();
});

// ========================================
// TYPING EFFECT FOR TAGLINE (desktop only, >1023px)
// Restored from the earlier version of this site: the tagline types itself out
// on desktop, with a blinking cursor. Phones, tablets and reduced-motion users
// get the full text straight away (CSS fades it in with the name and title).
// ========================================

const tagline = document.querySelector('.tagline');

if (tagline && tagline.dataset.originalText === undefined) {
    tagline.dataset.originalText = tagline.textContent;

    if (window.innerWidth <= 1023 || prefersReducedMotion) {
        tagline.textContent = tagline.dataset.originalText;
    } else {
        const text = tagline.dataset.originalText;
        tagline.textContent = '';

        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        tagline.appendChild(cursor);

        let charIndex = 0;
        const msPerChar = 35;   // was 50: a little faster
        const startDelay = 800; // was 1500

        // Frame-driven instead of setTimeout-per-char: characters land on the
        // display's refresh, so the reveal reads as one steady stream instead
        // of uneven hops.
        let startTime = null;
        function typeWriter(now) {
            if (startTime === null) startTime = now;
            const target = Math.min(Math.floor((now - startTime) / msPerChar), text.length);
            while (charIndex < target) {
                // Insert each character BEFORE the cursor node. Using
                // `tagline.textContent +=` would wipe out the cursor <span>
                // on the first iteration, so the blinking cursor never shows.
                tagline.insertBefore(document.createTextNode(text.charAt(charIndex)), cursor);
                charIndex++;
            }
            if (charIndex < text.length) {
                requestAnimationFrame(typeWriter);
            } else {
                setTimeout(() => {
                    if (cursor.parentNode) {
                        cursor.remove();
                    }
                }, 1000);
            }
        }

        setTimeout(() => requestAnimationFrame(typeWriter), startDelay);
    }
}

// ========================================
// ASYNC CSS - flip deferred stylesheets to active once loaded
// (replaces inline onload handlers so CSP can drop 'unsafe-inline')
// ========================================

(function() {
    var asyncLinks = document.querySelectorAll('link[data-async-css]');
    for (var i = 0; i < asyncLinks.length; i++) {
        (function(link) {
            if (link.sheet) {
                link.media = 'all';
            } else {
                link.addEventListener('load', function() { link.media = 'all'; });
            }
        })(asyncLinks[i]);
    }
})();

// ========================================
// EMAIL PROTECTION - Obfuscated & click-to-reveal
// ========================================

(function() {
    var encodedEmail = 'cmFnaHVrZWVydGhhbmE3NjJAZ21haWwuY29t';
    var email;
    try {
        email = atob(encodedEmail);
    } catch (e) {
        console.error('Email decoding failed:', e);
        email = '';
    }

    var emailLinks = document.querySelectorAll('.email-link');
    for (var i = 0; i < emailLinks.length; i++) {
        (function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'mailto:' + email;
            });
        })(emailLinks[i]);
    }

    var emailDisplay = document.querySelector('.email-display');
    if (emailDisplay) {
        // Clicking opens the mail client directly (the address is never shown),
        // so label it truthfully instead of "Click to reveal".
        emailDisplay.textContent = 'Click to email me';
        emailDisplay.style.cursor = 'pointer';
        emailDisplay.addEventListener('click', function(e) {
          e.stopPropagation();
          window.location.href = 'mailto:' + email;
        });
    }
})();
