// Simple JavaScript for resume site interactions

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling behavior for any internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add click handlers for the main CTA buttons
    const getInTouchBtn = document.querySelector('.btn-primary');
    const viewProjectsBtn = document.querySelector('.btn-secondary');

    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function() {
            // Scroll to contact section or open email
            const contactSection = document.querySelector('.contact-bg');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function() {
            // Could scroll to projects section or open portfolio
            // For now, scroll to skills section as a placeholder
            const skillsSection = document.querySelector('.py-24.bg-white');
            if (skillsSection) {
                skillsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Add intersection observer for animation triggers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        // Set initial state for elements that haven't animated yet
        if (!el.style.animationName) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });

    // Add hover effects for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add click-to-copy functionality for email
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const email = this.getAttribute('href').replace('mailto:', '');
            
            // Try to copy email to clipboard
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    // Show temporary feedback
                    const originalText = this.innerHTML;
                    this.innerHTML = '<span class="flex items-center justify-center gap-3"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>Email Copied!</span>';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                }).catch(() => {
                    // Fallback: just open email client
                    window.location.href = this.getAttribute('href');
                });
            }
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Press 'C' to scroll to contact
        if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey) {
            const contactSection = document.querySelector('.contact-bg');
            if (contactSection && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
        // Press 'T' to scroll to top
        if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey) {
            if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    });

    console.log('Resume site loaded successfully! 🚀');
    console.log('Keyboard shortcuts: Press "C" for contact, "T" for top');
});