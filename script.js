// script.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Welcome Modal functionality
    const welcomeModal = document.getElementById('welcomeModal');
    const closeModalBtn = document.getElementById('closeModal');
    const getStartedBtn = document.getElementById('getStartedBtn');
    
    // Function to close the modal
    function closeModal() {
        welcomeModal.classList.remove('active');
        // Set a cookie or local storage to prevent showing the modal again for a period of time
        localStorage.setItem('modalShown', 'true');
    }
    
    // Close modal when close button is clicked
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when get started button is clicked
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', closeModal);
    }
    
    // Check if modal has been shown before
    window.addEventListener('DOMContentLoaded', () => {
        const modalShown = localStorage.getItem('modalShown');
        if (!modalShown) {
            welcomeModal.classList.add('active');
        }
    });
    
    // Close modal if user clicks outside the modal content
    welcomeModal.addEventListener('click', function(e) {
        if (e.target === welcomeModal) {
            closeModal();
        }
    });
    
    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                item.classList.toggle('faq-active');
                
                // Rotate chevron icon
                const icon = question.querySelector('i');
                if (item.classList.contains('faq-active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        });
    }
    
    // Process chart
    const processCtx = document.getElementById('processChart');
    if (processCtx) {
        const processChart = new Chart(processCtx, {
            type: 'bar',
            data: {
                labels: ['Account Verification', 'Application Submission', 'Approval Process', 'Disbursement'],
                datasets: [{
                    label: 'Days Taken with Aadhaar Linked Only',
                    data: [14, 7, 21, 10],
                    backgroundColor: 'rgba(231, 76, 60, 0.7)',
                    borderColor: 'rgba(231, 76, 60, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Days Taken with DBT Enabled',
                    data: [0, 7, 7, 3],
                    backgroundColor: 'rgba(46, 204, 113, 0.7)',
                    borderColor: 'rgba(46, 204, 113, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Days'
                        }
                    }
                }
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    if (navLinks.length > 0) {
        navLinks.forEach(anchor => {
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
                    
                    // Close modal if open
                    if (welcomeModal.classList.contains('active')) {
                        closeModal();
                    }
                    
                    // Update URL hash without jumping
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            });
        });
    }
    
    // Resource card hover effects
    const resourceCards = document.querySelectorAll('.resource-card');
    if (resourceCards.length > 0) {
        resourceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Step card animations
    const stepCards = document.querySelectorAll('.step-card');
    if (stepCards.length > 0) {
        // Create Intersection Observer to animate step cards when they come into view
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };
        
        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Set initial state and observe each step card
        stepCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.transitionDelay = `${index * 0.2}s`;
            
            observer.observe(card);
        });
    }
    
    // Statistics counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        // Create Intersection Observer for stats
        const statsObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const targetValue = parseInt(statNumber.textContent);
                    const duration = 2000; // Animation duration in ms
                    const increment = targetValue / (duration / 16); // 60fps
                    
                    let currentValue = 0;
                    
                    const timer = setInterval(function() {
                        currentValue += increment;
                        if (currentValue >= targetValue) {
                            clearInterval(timer);
                            statNumber.textContent = targetValue + '%';
                        } else {
                            statNumber.textContent = Math.floor(currentValue) + '%';
                        }
                    }, 16);
                    
                    statsObserver.unobserve(statNumber);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe each stat number
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
    
    // Form validation for any future forms
    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                const inputs = this.querySelectorAll('input[required], textarea[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = 'var(--accent)';
                    } else {
                        input.style.borderColor = '';
                    }
                });
                
                if (isValid) {
                    // Form is valid, you can submit it here
                    console.log('Form is valid and would be submitted');
                    // this.submit(); // Uncomment to actually submit the form
                }
            });
        });
    }
    
    // Back to top button functionality
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.zIndex = '99';
    backToTopButton.style.backgroundColor = 'var(--secondary)';
    backToTopButton.style.color = 'white';
    backToTopButton.style.border = 'none';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.fontSize = '1.2rem';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    backToTopButton.style.display = 'none';
    backToTopButton.style.transition = 'opacity 0.3s ease';
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Add animation to comparison cards when they come into view
    const comparisonCards = document.querySelectorAll('.comparison-card');
    if (comparisonCards.length > 0) {
        const comparisonObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        comparisonCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            comparisonObserver.observe(card);
        });
    }
    
    // Add loading animation for any external resources
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Hide any loading spinner if exists
        const loadingSpinner = document.getElementById('loading-spinner');
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
    });
    
    // Add keyboard accessibility for modal
    document.addEventListener('keydown', function(e) {
        // Close modal on ESC key
        if (e.key === 'Escape' && welcomeModal.classList.contains('active')) {
            closeModal();
        }
        
        // Trap focus inside modal when it's open
        if (welcomeModal.classList.contains('active')) {
            const focusableElements = welcomeModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];
            
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
            }
        }
    });
});
