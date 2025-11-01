document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#mobile-menu') && !event.target.closest('#mobile-menu-button') && !event.target.closest('#theme-toggle-mobile')) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Dark Mode functionality
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    // Set theme based on saved preference or system preference
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.documentElement.classList.add('dark');
        updateThemeIcons('dark');
    } else {
        document.documentElement.classList.remove('dark');
        updateThemeIcons('light');
    }
    
    // Theme toggle functionality for desktop
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            toggleTheme();
        });
    }
    
    // Theme toggle functionality for mobile
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', function() {
            toggleTheme();
        });
    }
    
    // System theme change listener
    prefersDarkScheme.addEventListener('change', function(e) {
        // Only update if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.classList.add('dark');
                updateThemeIcons('dark');
            } else {
                document.documentElement.classList.remove('dark');
                updateThemeIcons('light');
            }
        }
    });
    
    function toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            updateThemeIcons('light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcons('dark');
        }
    }
    
    function updateThemeIcons(theme) {
        const themeIcons = document.querySelectorAll('#theme-icon, #theme-icon-mobile');
        themeIcons.forEach(icon => {
            if (theme === 'dark') {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // Add smooth transition for theme change
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Visitor counter (using localStorage)
    updateVisitorCounter();
    
    // Add fade-in animation to elements when they come into view
    setupScrollAnimations();
});

// Visitor counter function
function updateVisitorCounter() {
    let visitCount = localStorage.getItem('coretechVisitCount');
    
    if (visitCount) {
        visitCount = parseInt(visitCount) + 1;
    } else {
        visitCount = 1;
    }
    
    localStorage.setItem('coretechVisitCount', visitCount);
    
    // Display the counter (optional - you can show it somewhere on the page)
    console.log(`Welcome! This is your visit number: ${visitCount}`);
    
    // Update a counter element if it exists
    const counterElement = document.getElementById('visitor-counter');
    if (counterElement) {
        counterElement.textContent = visitCount;
    }
}

// Scroll animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
