// Terminal Portfolio - Interactive Scripts

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProjectCards();
    initializeGallery();
    initializeCommandInput();
    initializeContactForm();
    
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

// Gallery tabs and image loading
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
    
    // Load gallery images
    loadGalleryImages();
}

// Function to load gallery images
function loadGalleryImages() {
    const galleryGrid = document.querySelector('#photos-tab .gallery-grid');
    if (!galleryGrid) return;
    
    // List of gallery images - add your image filenames here
    // Example: const galleryImages = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
    const galleryImages = [
        // Add your gallery image filenames here
        // Example: 'images/gallery/photo1.jpg',
        // Example: 'images/gallery/photo2.jpg',
    ];
    
    // If no images are defined, keep the placeholders
    if (galleryImages.length === 0) {
        return;
    }
    
    // Clear placeholders and add images
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach(imagePath => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = 'Gallery Image';
        img.onerror = function() {
            // If image fails to load, show placeholder
            this.style.display = 'none';
            galleryItem.innerHTML = `
                <div class="gallery-placeholder">
                    <span class="icon">📸</span>
                    <p>Image not found</p>
                </div>
            `;
        };
        
        galleryItem.appendChild(img);
        galleryGrid.appendChild(galleryItem);
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

// ============================================
// EMAILJS CONFIGURATION
// ============================================
// To enable email sending, follow these steps:
// 1. Sign up at https://www.emailjs.com/ (free tier available)
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template with these variables:
//    - {{message}}
//    - {{visitor_email}}
//    - {{visitor_phone}}
// 4. Get your Service ID, Template ID, and Public Key
// 5. Replace the values below with your credentials
// ============================================
const EMAILJS_CONFIG = {
    enabled: true, // EmailJS is configured and enabled
    serviceID: 'service_ybnmymb',
    templateID: 'template_gjwds4l',
    publicKey: 'PBb25GxukJr4gzV6H',
    recipientEmail: 'aks.akanksha01@gmail.com' // Your email address
};

// Contact Button functionality
function initializeContactForm() {
    const contactBtn = document.getElementById('contact-me-btn');
    const contactModal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close');
    const modalForm = document.getElementById('contact-modal-form');
    const contactMessage = document.getElementById('contact-message');
    
    if (!contactBtn || !contactModal) return;
    
    // Initialize EmailJS if configured
    if (EMAILJS_CONFIG.enabled && typeof emailjs !== 'undefined') {
        try {
            emailjs.init(EMAILJS_CONFIG.publicKey);
        } catch (error) {
            console.warn('EmailJS initialization failed:', error);
            EMAILJS_CONFIG.enabled = false;
        }
    }
    
    // Open modal when button is clicked
    contactBtn.addEventListener('click', function() {
        contactModal.classList.add('show');
        // Focus on first input
        setTimeout(() => {
            const firstInput = modalForm.querySelector('textarea, input');
            if (firstInput) firstInput.focus();
        }, 100);
    });
    
    // Close modal when X is clicked
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            contactModal.classList.remove('show');
            modalForm.reset();
            if (contactMessage) {
                contactMessage.classList.remove('show', 'success', 'error');
            }
        });
    }
    
    // Close modal when clicking outside
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            contactModal.classList.remove('show');
            modalForm.reset();
            if (contactMessage) {
                contactMessage.classList.remove('show', 'success', 'error');
            }
        }
    });
    
    // Handle form submission
    if (modalForm) {
        modalForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Hide previous messages
            if (contactMessage) {
                contactMessage.classList.remove('show', 'success', 'error');
            }
            
            // Get form values
            const message = document.getElementById('modal-message').value.trim();
            const visitorEmail = document.getElementById('modal-email').value.trim();
            const visitorPhone = document.getElementById('modal-phone').value.trim();
            
            // Validation
            if (!message) {
                if (contactMessage) {
                    contactMessage.textContent = 'Please enter a message.';
                    contactMessage.classList.add('show', 'error');
                }
                return;
            }
            
            if (!visitorEmail && !visitorPhone) {
                if (contactMessage) {
                    contactMessage.textContent = 'Please provide at least your email or phone number.';
                    contactMessage.classList.add('show', 'error');
                }
                return;
            }
            
            // Disable submit button
            const submitBtn = document.getElementById('modal-submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
            
            // Prepare email content
            const subject = encodeURIComponent('Contact from Portfolio Website');
            const emailBody = encodeURIComponent(
                `Hello Akanksha,\n\n` +
                `I would like to get in touch with you.\n\n` +
                `Message:\n${message}\n\n` +
                `My Contact Information:\n` +
                `Email: ${visitorEmail || 'Not provided'}\n` +
                `Phone: ${visitorPhone || 'Not provided'}\n\n` +
                `Best regards`
            );
            
            try {
                // Try EmailJS first if enabled
                if (EMAILJS_CONFIG.enabled && typeof emailjs !== 'undefined') {
                    const templateParams = {
                        message: message,
                        visitor_email: visitorEmail || 'Not provided',
                        visitor_phone: visitorPhone || 'Not provided',
                        to_email: EMAILJS_CONFIG.recipientEmail
                    };
                    
                    await emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams);
                    
                    // Success
                    if (contactMessage) {
                        contactMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                        contactMessage.classList.add('show', 'success');
                    }
                    
                    // Close modal after a delay
                    setTimeout(() => {
                        contactModal.classList.remove('show');
                        modalForm.reset();
                    }, 2000);
                    
                    // Track success
                    if (typeof trackEvent === 'function') {
                        trackEvent('contact', 'form_submit', 'success');
                    }
                } else {
                    // Use mailto link as fallback
                    window.location.href = `mailto:${EMAILJS_CONFIG.recipientEmail}?subject=${subject}&body=${emailBody}`;
                    
                    if (contactMessage) {
                        contactMessage.textContent = 'Opening your email client... Please send the email manually.';
                        contactMessage.classList.add('show', 'success');
                    }
                    
                    // Close modal after a delay
                    setTimeout(() => {
                        contactModal.classList.remove('show');
                        modalForm.reset();
                    }, 2000);
                    
                    // Track mailto usage
                    if (typeof trackEvent === 'function') {
                        trackEvent('contact', 'form_submit', 'mailto');
                    }
                }
            } catch (error) {
                console.error('Error sending email:', error);
                
                // Fallback to mailto on error
                window.location.href = `mailto:${EMAILJS_CONFIG.recipientEmail}?subject=${subject}&body=${emailBody}`;
                
                if (contactMessage) {
                    contactMessage.textContent = 'Email service unavailable. Opening your email client as fallback...';
                    contactMessage.classList.add('show', 'error');
                }
                
                // Track error
                if (typeof trackEvent === 'function') {
                    trackEvent('contact', 'form_submit', 'error');
                }
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
            }
        });
    }
}


