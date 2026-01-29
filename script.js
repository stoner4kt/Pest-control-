// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Services Data
const services = [
    {
        id: 1,
        title: "Whole House Fumigation",
        price: "R850",
        icon: "🏠",
        color: "#2a6e3f",
        features: [
            "Complete property treatment",
            "Eco-friendly fumigants",
            "2-week follow-up inspection",
            "Family & pet safe after 4 hours"
        ]
    },
    {
        id: 2,
        title: "Bed Bugs Treatment",
        price: "R750",
        icon: "🛏️",
        color: "#e74c3c",
        features: [
            "Heat treatment or chemical",
            "Mattress & furniture safe",
            "Guaranteed elimination",
            "Follow-up inspection included"
        ]
    },
    {
        id: 3,
        title: "Cockroaches Elimination",
        price: "R650",
        icon: "🐜",
        color: "#8e44ad",
        features: [
            "Bait & spray treatment",
            "Targets nests & hiding spots",
            "Monthly maintenance available",
            "Child & pet friendly solutions"
        ]
    },
    {
        id: 4,
        title: "Rats/Mice Control",
        price: "R600",
        icon: "🐭",
        color: "#34495e",
        features: [
            "Humane trapping methods",
            "Entry point identification",
            "Sanitation recommendations",
            "Prevention strategies"
        ]
    },
    {
        id: 5,
        title: "Ants Extermination",
        price: "R650",
        icon: "🐜",
        color: "#d35400",
        features: [
            "Colony elimination",
            "Indoor & outdoor treatment",
            "Long-lasting barrier spray",
            "Safe for gardens & plants"
        ]
    },
    {
        id: 6,
        title: "Yard Spraying",
        price: "R800",
        icon: "🌳",
        color: "#27ae60",
        features: [
            "Mosquito & tick control",
            "Perimeter protection",
            "Pet-friendly after drying",
            "Lasts up to 3 months"
        ]
    }
];

// DOM Elements
const servicesGrid = document.querySelector('.services-grid');
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const closeModal = document.querySelector('.close-modal');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize Services
function initializeServices() {
    servicesGrid.innerHTML = '';
    
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        
        serviceCard.innerHTML = `
            <div class="service-header" style="background-color: ${service.color}">
                <div class="service-icon">${service.icon}</div>
                <h3 class="service-title">${service.title}</h3>
                <div class="service-price">${service.price}</div>
            </div>
            <div class="service-body">
                <ul class="service-features">
                    ${service.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
                <a href="#contact" class="btn btn-primary service-btn" data-service="${service.title}">
                    Book This Service
                </a>
            </div>
        `;
        
        servicesGrid.appendChild(serviceCard);
    });
}

// Initialize GSAP Animations (only for subtle effects, not hiding content)
function initializeAnimations() {
    // Hero section animations - subtle entrance
    gsap.to('.hero-title', {
        duration: 1,
        y: 0,
        opacity: 1,
        delay: 0.3,
        ease: "power2.out"
    });
    
    gsap.to('.hero-subtitle', {
        duration: 1,
        y: 0,
        opacity: 1,
        delay: 0.5,
        ease: "power2.out"
    });
    
    gsap.to('.hero-buttons', {
        duration: 1,
        y: 0,
        opacity: 1,
        delay: 0.7,
        ease: "power2.out"
    });
    
    gsap.to('.floating-shield', {
        duration: 1.5,
        opacity: 0.2,
        delay: 1,
        ease: "power2.out"
    });
    
    // Service cards animations on scroll
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            onEnter: () => {
                gsap.to(card, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "power2.out"
                });
            },
            onLeaveBack: () => {
                gsap.to(card, {
                    y: 20,
                    opacity: 0,
                    duration: 0.3
                });
            }
        });
    });
    
    // Feature animations on scroll
    gsap.utils.toArray('.feature').forEach((feature, i) => {
        ScrollTrigger.create({
            trigger: feature,
            start: "top 80%",
            onEnter: () => {
                gsap.to(feature, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: i * 0.15,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Form animation on scroll
    ScrollTrigger.create({
        trigger: '.contact-form',
        start: "top 80%",
        onEnter: () => {
            gsap.to('.contact-form', {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            });
        }
    });
    
    // Contact info animation on scroll
    ScrollTrigger.create({
        trigger: '.contact-info',
        start: "top 80%",
        onEnter: () => {
            gsap.to('.contact-info', {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            });
        }
    });
}

// Form Submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // In a real application, you would send this data to your server
    console.log('Form submitted:', formData);
    
    // Save to localStorage (simulating database storage)
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push(formData);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    // Show success modal
    successModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Reset form
    contactForm.reset();
    
    // Animate modal appearance
    gsap.fromTo('.modal-content', 
        { scale: 0.8, opacity: 0 },
        { duration: 0.5, scale: 1, opacity: 1, ease: 'back.out(1.7)' }
    );
}

// Mobile Navigation Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Close mobile menu when clicking a link
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Pre-fill service if clicked from service card
function handleServiceCardClick(e) {
    if (e.target.classList.contains('service-btn')) {
        const serviceName = e.target.getAttribute('data-service');
        const serviceSelect = document.getElementById('service');
        
        // Find the matching option
        for (let option of serviceSelect.options) {
            if (option.text.includes(serviceName)) {
                option.selected = true;
                break;
            }
        }
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
}

// Close modal
function closeSuccessModal() {
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize services
    initializeServices();
    
    // Initialize animations
    initializeAnimations();
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Modal close
    closeModal.addEventListener('click', closeSuccessModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });
    
    // Mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Service card clicks
    servicesGrid.addEventListener('click', handleServiceCardClick);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successModal.style.display === 'flex') {
            closeSuccessModal();
        }
    });
    
    // Active navigation on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    });
});

// Form validation
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
    input.addEventListener('blur', (e) => {
        if (e.target.value.trim() === '' && e.target.required) {
            e.target.style.borderColor = '#e74c3c';
            e.target.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
        } else {
            e.target.style.borderColor = '#ddd';
            e.target.style.boxShadow = 'none';
        }
    });
    
    input.addEventListener('input', (e) => {
        if (e.target.value.trim() !== '') {
            e.target.style.borderColor = '#2a6e3f';
            e.target.style.boxShadow = '0 0 0 3px rgba(42, 110, 63, 0.1)';
        }
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const current = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (current >= sectionTop && current < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});