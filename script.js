// Terminal Portfolio - Interactive Scripts

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProjectCards();
    initializeGallery();
    initializeCommandInput();
    
    // Track page view
    if (typeof trackPageView === 'function') {
        trackPageView('home');
    }
});

// Navigation functionality
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const screens = document.querySelectorAll('.screen');
    const welcomeScreen = document.getElementById('welcome-screen');

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav button
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all screens
            screens.forEach(screen => screen.classList.remove('active'));
            welcomeScreen.classList.remove('active');
            
            // Show target section
            const targetScreen = document.getElementById(targetSection);
            if (targetScreen) {
                targetScreen.classList.add('active');
                
                // Track navigation
                if (typeof trackEvent === 'function') {
                    trackEvent('navigation', 'click', targetSection);
                }
            }
        });
    });
}

// Project cards click tracking
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const link = this.getAttribute('data-link');
            if (link) {
                // Track project click
                if (typeof trackEvent === 'function') {
                    trackEvent('project', 'click', link);
                }
                
                // Open link in new tab
                window.open(link, '_blank');
            }
        });
    });
}

// Gallery tabs
function initializeGallery() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryTabContents = document.querySelectorAll('.gallery-tab-content');
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            galleryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show target content
            galleryTabContents.forEach(content => content.classList.remove('active'));
            const targetContent = document.getElementById(targetTab + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
                
                // Track gallery tab switch
                if (typeof trackEvent === 'function') {
                    trackEvent('gallery', 'tab_switch', targetTab);
                }
            }
        });
    });
}

// Command input functionality (optional feature)
function initializeCommandInput() {
    // You can enable this by uncommenting the command input container in HTML
    const commandInput = document.getElementById('terminal-input');
    
    if (commandInput) {
        const commands = {
            'help': showHelp,
            'about': () => navigateToSection('about'),
            'experience': () => navigateToSection('experience'),
            'projects': () => navigateToSection('projects'),
            'skills': () => navigateToSection('skills'),
            'gallery': () => navigateToSection('gallery'),
            'contact': () => navigateToSection('contact'),
            'clear': clearTerminal,
            'ls': listSections,
            'whoami': showWhoAmI
        };
        
        commandInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                this.value = '';
                
                if (commands[command]) {
                    commands[command]();
                } else if (command) {
                    showError(`Command not found: ${command}. Type 'help' for available commands.`);
                }
            }
        });
    }
}

function navigateToSection(section) {
    const navButton = document.querySelector(`[data-section="${section}"]`);
    if (navButton) {
        navButton.click();
    }
}

function showHelp() {
    const output = document.querySelector('.output');
    if (output) {
        output.innerHTML = `
            <pre>
Available commands:
  help        - Show this help message
  about       - Navigate to about section
  experience  - Navigate to experience section
  projects    - Navigate to projects section
  skills      - Navigate to skills section
  gallery     - Navigate to gallery section
  contact     - Navigate to contact section
  clear       - Clear terminal
  ls          - List all sections
  whoami      - Show information about me
            </pre>
        `;
    }
}

function clearTerminal() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        if (screen.classList.contains('active')) {
            const output = screen.querySelector('.output');
            if (output) {
                output.innerHTML = '<p>Terminal cleared.</p>';
            }
        }
    });
}

function listSections() {
    const output = document.querySelector('.output');
    if (output) {
        output.innerHTML = `
            <pre>
Sections:
  about/
  experience/
  projects/
  skills/
  gallery/
  contact/
            </pre>
        `;
    }
}

function showWhoAmI() {
    const output = document.querySelector('.output');
    if (output) {
        output.innerHTML = `
            <pre>
Name: Akanksha Singh
Role: Software Developer – Backend
Location: Bengaluru, Karnataka, India
GitHub: aks-akanksha
LinkedIn: singhakanksha01
Email: aks.akanksha01@gmail.com
            </pre>
        `;
    }
}

function showError(message) {
    const output = document.querySelector('.output');
    if (output) {
        output.innerHTML = `<p style="color: #ff5f56;">Error: ${message}</p>`;
    }
}

// Track all external link clicks
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname) {
        if (typeof trackEvent === 'function') {
            trackEvent('external_link', 'click', link.href);
        }
    }
    
    // Track contact link clicks
    if (link && link.classList.contains('contact-link')) {
        const linkType = link.getAttribute('data-link-type');
        if (typeof trackEvent === 'function') {
            trackEvent('contact', 'click', linkType);
        }
    }
});

// Smooth scroll for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add typing animation effect to terminal commands
function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards and timeline items
document.querySelectorAll('.project-card, .timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

