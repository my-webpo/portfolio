// Handle Preloader
const preloader = document.getElementById('preloader');
if (preloader) {
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-fade-up, .animate-fade-in');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            if (el.classList.contains('animate-fade-up')) {
                el.style.animation = 'fade-up 1s forwards';
            } else if (el.classList.contains('animate-fade-in')) {
                el.style.animation = 'fade-in 1s forwards';
            }
        }
    });

    // New: Animate hero background
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
            heroSection.classList.add('animate-active');
        } else {
            heroSection.classList.remove('animate-active');
        }
    }
}
window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Initial check on load

// Add a class to the header on scroll
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Swiper Slider Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Back-to-top button functionality with new "water fill" effect
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                backToTopBtn.classList.add('show');
                backToTopBtn.classList.add('scrolled-down');
            } else {
                backToTopBtn.classList.remove('show');
                backToTopBtn.classList.remove('scrolled-down');
            }
        });
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        watchSlidesProgress: true,
        autoHeight: true,
    });

    /* ========================================================= */
    /* === Typing/Deleting Effect for Demos Section === */
    /* ========================================================= */
    const typingElement = document.querySelector('.typing-text-effect');
    if (typingElement) {
        const textArray = ["Multi-site", "Versatile", "Different Designs", "Mega Menu"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeText() {
            const currentText = textArray[textIndex];
            let displayText;

            if (isDeleting) {
                displayText = currentText.substring(0, charIndex - 1);
                typingElement.style.borderRight = '2px solid var(--primary-color)';
            } else {
                displayText = currentText.substring(0, charIndex + 1);
                typingElement.style.borderRight = '2px solid var(--primary-color)';
            }

            typingElement.textContent = displayText;

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 1000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
            }

            charIndex += isDeleting ? -1 : 1;
            setTimeout(typeText, isDeleting ? 50 : 150);
        }

        setTimeout(typeText, 1000);
    }

    // Snowfall Effect - Modified to be a toggle
    const snowfallContainer = document.getElementById('snowfall-container');
    const snowfallToggleBtn = document.getElementById('snowfall-toggle-btn');
    let snowfallInterval = null;

    const createSnowflake = () => {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        const startX = Math.random() * window.innerWidth;
        snowflake.style.left = `${startX}px`;

        const size = Math.random() * 5 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;

        const duration = Math.random() * 8 + 5;
        const delay = Math.random() * 0.5;

        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${delay}s`;

        snowfallContainer.appendChild(snowflake);

        setTimeout(() => {
            snowflake.remove();
        }, (duration + delay) * 1000);
    };

    const toggleSnowfall = () => {
        if (snowfallInterval) {
            clearInterval(snowfallInterval);
            snowfallInterval = null;
            snowfallContainer.innerHTML = '';
            snowfallToggleBtn.innerHTML = '<i class="fas fa-cog"></i>';
            snowfallToggleBtn.classList.remove('active');
        } else {
            const isMobile = window.innerWidth <= 768;
            const interval = isMobile ? 600 : 100; // 300ms for mobile, 100ms for desktop
            snowfallInterval = setInterval(createSnowflake, interval);
            snowfallToggleBtn.innerHTML = '<i class="fas fa-fan"></i>';
            snowfallToggleBtn.classList.add('active');
        }
    };

    if (snowfallToggleBtn) {
        snowfallToggleBtn.addEventListener('click', toggleSnowfall);
        toggleSnowfall();
    }

    /*----------------------------------------------------------
       Theme Toggle (Light/Dark Mode)
    ------------------------------------------------------------*/
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'light-mode') {
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else {
        // Set a default theme if none is saved (optional, can be 'dark-mode' or nothing)
        body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light-mode');
            } else {
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark-mode');
            }
        });
    }
});