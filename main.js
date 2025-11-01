document.addEventListener('DOMContentLoaded', () => {


    /*----------------------------------------------------------
     * Preloader
    ------------------------------------------------------------*/
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hide-preloader');
            }, 500);
        });
    }

    /*----------------------------------------------------------
     * Mobile Menu Toggle
    ------------------------------------------------------------*/
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuPopup = document.getElementById('mobile-menu-popup');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileMenuToggle && mobileMenuPopup && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuPopup.classList.add('show-menu');
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenuPopup.classList.remove('show-menu');
        });

        document.querySelectorAll('.mobile-nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuPopup.classList.remove('show-menu');
            });
        });
    }

    /*----------------------------------------------------------
     * Typed.js for Hero Section
    ------------------------------------------------------------*/
    const typedTextElement = document.querySelector('.typing-text');
    if (typedTextElement) {
        const typed = new Typed(typedTextElement, {
            strings: [
                'UI/UX Designer',
                'Frontend Developer',
                'Web Designer',
                'Creative Coder'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true
        });
    }

    /*----------------------------------------------------------
     * Portfolio Filter
    ------------------------------------------------------------*/
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const isHidden = item.classList.contains('hidden');

                if (filterValue === 'all' || item.classList.contains(`filter-${filterValue}`)) {
                    if (isHidden) {
                        item.classList.remove('hidden');
                    }
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    /*----------------------------------------------------------
     * Scroll to Top Button
    ------------------------------------------------------------*/
    const scrollToTopBtn = document.getElementById('scroll-to-top-btn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });
    }

    /*----------------------------------------------------------
     * AOS Initialization
    ------------------------------------------------------------*/
    AOS.init({
        duration: 1000,
        once: true,
    });

    /*----------------------------------------------------------
     * Countdown Timer for Coming Soon Page
    ------------------------------------------------------------*/
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement && hoursElement && minutesElement && secondsElement) {
        const countDownDate = new Date("Oct 26, 2025 15:37:25").getTime();

        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysElement.innerHTML = days < 10 ? "0" + days : days;
            hoursElement.innerHTML = hours < 10 ? "0" + hours : hours;
            minutesElement.innerHTML = minutes < 10 ? "0" + minutes : minutes;
            secondsElement.innerHTML = seconds < 10 ? "0" + seconds : seconds;

            if (distance < 0) {
                clearInterval(x);
                const countdownCompletedElement = document.getElementById("countdown");
                if (countdownCompletedElement) {
                    countdownCompletedElement.innerHTML = "LAUNCHED!";
                }
            }
        }, 1000);
    }

    /*----------------------------------------------------------
        Dark Mode Functionality
    ------------------------------------------------------------*/
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    if (themeToggleBtn) {
        const toggleDarkMode = () => {
            const body = document.body;
            const icon = themeToggleBtn.querySelector('i');

            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            } else {
                localStorage.setItem('theme', 'light');
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
        };

        const loadTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            const body = document.body;
            const icon = themeToggleBtn.querySelector('i');

            // This is the corrected logic. It prioritizes the saved preference.
            if (savedTheme === 'dark') {
                body.classList.add('dark-mode');
                if (icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            } else if (savedTheme === 'light') {
                body.classList.remove('dark-mode');
                if (icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }
            // If there's no saved preference, it will check the system preference
            else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                    body.classList.add('dark-mode');
                    if (icon) {
                        icon.classList.remove('fa-moon');
                        icon.classList.add('fa-sun');
                    }
                }
            }
        };

        // Load the saved theme on page load
        loadTheme();

        // Add event listener to the toggle button
        themeToggleBtn.addEventListener('click', toggleDarkMode);
    }
});