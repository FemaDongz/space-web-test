document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const mainContent = document.querySelector('.main-content');
    const introSection = document.querySelector('.intro');
    const moonIcon = document.querySelector('.moon');

    // Loading screen animation
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress > 100) progress = 100;

        loadingPercentage.textContent = `${progress}%`;

        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    startIntroAnimation();
                }, 800);
            }, 1000);
        }
    }, 100);

    // Create overlay particles
    function createOverlayParticles() {
        const containers = document.querySelectorAll('.overlay-particles');
        containers.forEach(container => {
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                const size = Math.random() * 4 + 2;
                const posX = Math.random() * 100;
                const posY = Math.random() * 100;
                const delay = Math.random() * 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}%`;
                particle.style.top = `${posY}%`;
                particle.style.animationDelay = `${delay}s`;
                container.appendChild(particle);
            }
        });
    }
    createOverlayParticles();

    // Intro animation with GSAP
    function startIntroAnimation() {
        const introTimeline = gsap.timeline({
            onComplete: () => {
                gsap.to('.intro-overlay', {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        document.querySelector('.intro-overlay').style.display = 'none';
                        mainContent.style.overflow = 'auto';
                        document.body.style.overflow = 'auto';
                        introSection.classList.add('active');
                        moonIcon.style.display = 'block';
                        createStars();
                        animateOrbits();
                    }
                });
            }
        });

        introTimeline.to('.intro-overlay', { opacity: 1, duration: 0.5 })
            .to('.welcome-text', {
                opacity: 1,
                scale: 1.1,
                duration: 0,
                onStart: () => {
                    typeText('.welcome-text', 'Welcome to my website Space Future femaandara_');
                }
            })
            .to('.welcome-text', { opacity: 1, scale: 1, duration: 2 })
            .to('.explore-text', { opacity: 1, scale: 1.1, duration: 1, ease: 'power2.out' }, '+=1')
            .to('.explore-text', { scale: 1, duration: 0.5 })
            .to(['.welcome-text', '.explore-text'], { opacity: 0, duration: 1 }, '+=2');
    }

    // Typing effect for welcome text
    function typeText(element, text) {
        let index = 0;
        const target = document.querySelector(element);
        function type() {
            if (index < text.length) {
                target.innerHTML = text.substring(0, index + 1).replace('femaandara_', '<span class="highlight">femaandara_</span>');
                index++;
                gsap.to(target, { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1 });
                setTimeout(type, 80);
            }
        }
        type();
    }

    // Create stars
    function createStars() {
        const stars = document.querySelector('.stars');
        const starsCount = 200;

        for (let i = 0; i < starsCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            const size = Math.random() * 2.5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 3 + 2;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;
            star.style.animationDelay = `${delay}s`;
            star.style.setProperty('--duration', `${duration}s`);

            if (Math.random() > 0.8) {
                star.classList.add('purple');
            }

            stars.appendChild(star);
        }
    }

    // Orbit animation with requestAnimationFrame
    function animateOrbits() {
        const planets = [
            { element: '.mercury', period: 4 },
            { element: '.venus', period: 8 },
            { element: '.earth', period: 12 },
            { element: '.mars', period: 16 },
            { element: '.jupiter', period: 20 },
            { element: '.saturn', period: 24 },
            { element: '.uranus', period: 28 },
            { element: '.neptune', period: 32 },
            { element: '.pluto', period: 36 }
        ];

        function update() {
            planets.forEach(planet => {
                const el = document.querySelector(planet.element);
                if (el) {
                    const angle = (Date.now() / (planet.period * 1000)) * 360 % 360;
                    el.style.transform = `rotate(${angle}deg) translateX(50%) rotate(-${angle}deg)`;
                }
            });
            requestAnimationFrame(update);
        }

        gsap.to('.solar-system-container', { opacity: 1, duration: 1 });
        update();
    }

    // Update time and year progress
    function updateTimeAndProgress() {
        const currentTimeElement = document.getElementById('current-time');
        const yearProgressBar = document.getElementById('year-progress-bar');
        const yearPercentageElement = document.getElementById('year-percentage');
        const yearDaysElement = document.getElementById('year-days');
        const yearExplanationElement = document.getElementById('year-explanation');

        function update() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;

            const startOfYear = new Date(now.getFullYear(), 0, 1);
            const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
            const yearTotal = endOfYear - startOfYear;
            const yearElapsed = now - startOfYear;
            const yearProgress = (yearElapsed / yearTotal) * 100;

            yearProgressBar.style.width = `${yearProgress}%`;
            yearPercentageElement.textContent = `${yearProgress.toFixed(2)}%`;
            yearExplanationElement.textContent = `We’ve traveled ${yearProgress.toFixed(2)}% of this year’s orbit.`;

            const daysInYear = (now.getFullYear() % 4 === 0) ? 366 : 365;
            const dayOfYear = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
            yearDaysElement.textContent = `${dayOfYear} days from ${daysInYear} days`;

            requestAnimationFrame(update);
        }

        update();
    }

    updateTimeAndProgress();

    // Scroll indicator click
    document.querySelector('.scroll-indicator').addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });

    // Project buttons functionality
    const projectButtons = document.querySelectorAll('.project-button');
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('This feature is coming soon!');
        });
    });

    // Moon icon toggle for dark/light mode (future functionality)
    document.querySelector('.moon').addEventListener('click', function() {
        this.classList.toggle('active');
        // Add future functionality for dark/light mode toggle
    });
});
