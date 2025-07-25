document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else {
        // Default to dark theme if no preference saved
        body.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('mobile-open');
        navToggle.classList.toggle('open'); // For hamburger animation
        // Add/remove class to enable/disable pointer events
        if (mainNav.classList.contains('mobile-open')) {
            setTimeout(() => {
                mainNav.classList.add('is-visible');
            }, 10); // Small delay to allow CSS transition to start
        } else {
            mainNav.classList.remove('is-visible');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('mobile-open')) {
                mainNav.classList.remove('mobile-open');
                mainNav.classList.remove('is-visible');
                navToggle.classList.remove('open');
            }
        });
    });

    // Smooth Scrolling & Active Nav Link
    const sections = document.querySelectorAll('section.portfolio-section');
    const headerHeight = document.querySelector('.main-header').offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20; // Adjusted for fixed header and padding
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Project Modal
    const projectModal = document.getElementById('project-modal');
    const closeButton = projectModal.querySelector('.close-button');
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

    const projectsData = {
        1: {
            title: "IPO Web App & REST API",
            description: "A comprehensive full-stack web application developed using Django for the backend and a responsive frontend. It allows users to manage and view IPO (Initial Public Offering) data, including real-time updates, filtering, and search functionalities. The REST API facilitates seamless data interaction, making it suitable for both administrative tasks and public viewing.",
            tech: "Django, Python, REST API, HTML5, CSS3, JavaScript, PostgreSQL",
            github: "https://github.com/rehanraza099/IPO-Web-App-with-REST-API", // Placeholder
            live: "#" // No live demo link available
        },
        2: {
            title: "Personal Finance Tracker (CLI)",
            description: "A command-line interface (CLI) application built with Python to help users track their personal finances. It allows for recording income, expenses, and savings, providing a simple yet effective way to manage budgeting. Data is stored locally using file operations, ensuring privacy and ease of use for individual tracking.",
            tech: "Python, CLI, File I/O",
            github: "https://github.com/rehanraza099/Personal-Finance-Tracker", // Placeholder
            live: "#" // No live demo link available
        },
        3: {
            title: "Hangman Game",
            description: "An interactive, text-based Hangman game developed in Python. This classic word-guessing game features robust input validation, clear game state displays, and a replay option to enhance user engagement. It's a fun demonstration of basic game logic and user interaction in a console environment.",
            tech: "Python, Game Development, Console Applications",
            github: "https://github.com/rehanraza099/Hangman-Game", // Placeholder
            live: "#" // No live demo link available
        }
    };

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const projectId = event.target.closest('.project-card').dataset.projectId;
            const project = projectsData[projectId];

            if (project) {
                document.getElementById('modal-project-title').textContent = project.title;
                document.getElementById('modal-project-description').textContent = project.description;
                document.getElementById('modal-project-tech').textContent = project.tech;
                document.getElementById('modal-project-github').href = project.github;
                document.getElementById('modal-project-live').href = project.live;

                // Hide live demo link if not available
                if (project.live === '#') {
                    document.getElementById('modal-project-live').style.display = 'none';
                } else {
                    document.getElementById('modal-project-live').style.display = 'inline-flex';
                }

                projectModal.classList.add('show');
            }
        });
    });

    closeButton.addEventListener('click', () => {
        projectModal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.classList.remove('show');
        }
    });

    // Contact Form Submission (Example - for a real site, use a backend service)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        formStatus.textContent = 'Sending message...';
        formStatus.style.color = 'orange';

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 2000));

        // In a real application, you'd send data to a backend here
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Form submitted:', data);

        formStatus.textContent = 'Message sent successfully! 🎉';
        formStatus.style.color = 'var(--highlight-color)';
        contactForm.reset();
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();


    // --- Scroll Reveal Animations (NEW & IMPROVED) ---
    const observerOptions = {
        root: null, // viewport as root
        rootMargin: '0px',
        threshold: 0.15 // 15% of element visible to trigger
    };

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animation;
                const delay = element.dataset.delay ? parseFloat(element.dataset.delay) : 0;

                // Add is-visible class after a delay
                setTimeout(() => {
                    element.classList.add('is-visible');

                    // If it's a staggered animation, apply animation to children with delay
                    if (animation && animation.endsWith('Staggered')) {
                        Array.from(element.children).forEach((child, index) => {
                            setTimeout(() => {
                                child.style.opacity = '1'; // Ensure child is visible
                                child.style.transform = 'translateY(0)'; // Ensure child is in final position
                            }, index * (parseFloat(getComputedStyle(element).getPropertyValue('--animation-delay-base')) * 1000 || 100)); // Use CSS variable or default to 100ms
                        });
                    }
                }, delay * 1000); // Apply element-specific delay

                observer.unobserve(element); // Stop observing once animated
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    document.querySelectorAll('.animate-reveal').forEach(element => {
        observer.observe(element);
    });

    // --- Typing Effect for Hero Section (NEW) ---
    const typeTextElement = document.querySelector('.type-text');
    if (typeTextElement) {
        const words = JSON.parse(typeTextElement.dataset.words);
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150; // Milliseconds per character

        function type() {
            const currentWord = words[wordIndex];
            const displayChar = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
            typeTextElement.textContent = displayChar;

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                typingSpeed = 150; // Typing speed
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                typingSpeed = 80; // Deleting speed
            } else if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 300; // Pause before typing next word
            }

            setTimeout(type, typingSpeed);
        }

        // Start typing effect after hero section animations or a short delay
        const heroTextContent = document.querySelector('.hero-text-content');
        if (heroTextContent) {
            // Check if hero content is visible before starting typing effect
            const heroObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    type();
                    heroObserver.unobserve(heroTextContent); // Stop observing once typing starts
                }
            }, { threshold: 0.5 });
            heroObserver.observe(heroTextContent);
        } else {
            type(); // Fallback if hero content not found or observer not needed
        }
    }
});