document.addEventListener('DOMContentLoaded', function() {
    // Persistent Countdown Timer with localStorage
    function initializeCountdown() {
        const countdownKey = 'vikkahub_countdown_end';
        let endTime = localStorage.getItem(countdownKey);
        
        // If no timer exists or it's expired, set new 48-hour timer
        if (!endTime || Date.now() > parseInt(endTime)) {
            endTime = Date.now() + 172800000; // 48 hours in milliseconds
            localStorage.setItem(countdownKey, endTime.toString());
        } else {
            endTime = parseInt(endTime);
        }

        function updateTimer() {
            const now = Date.now();
            const remaining = endTime - now;
            
            if (remaining <= 0) {
                clearInterval(timerInterval);
                document.querySelectorAll('.timer-box, .countdown-timer').forEach(el => {
                    el.innerHTML = '<span class="expired-message">OFFER EXPIRED</span>';
                });
                return;
            }
            
            // Calculate time units
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            
            // Update all timer displays
            const timerElements = {
                hours: document.getElementById('hours'),
                countdownHours: document.getElementById('countdown-hours'),
                countdownMinutes: document.getElementById('countdown-minutes'),
                countdownSeconds: document.getElementById('countdown-seconds')
            };
            
            if (timerElements.hours) timerElements.hours.textContent = hours.toString().padStart(2, '0');
            if (timerElements.countdownHours) timerElements.countdownHours.textContent = hours.toString().padStart(2, '0');
            if (timerElements.countdownMinutes) timerElements.countdownMinutes.textContent = minutes.toString().padStart(2, '0');
            if (timerElements.countdownSeconds) timerElements.countdownSeconds.textContent = seconds.toString().padStart(2, '0');
        }
        
        // Update immediately and then every second
        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    }

    // Enhanced Form Validation
    function setupFormValidation() {
        const emailForm = document.getElementById('emailForm');
        if (!emailForm) return;

        const nameInput = emailForm.querySelector('input[type="text"]');
        const emailInput = emailForm.querySelector('input[type="email"]');
        const errorElement = document.getElementById('emailError');

        function validateForm() {
            let isValid = true;
            
            // Name validation
            if (nameInput.value.trim().length < 3) {
                nameInput.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.classList.remove('invalid');
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('invalid');
                isValid = false;
            } else {
                emailInput.classList.remove('invalid');
            }
            
            return isValid;
        }

        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Track conversion
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'conversion', {
                        'event_category': 'Form',
                        'event_label': 'Email Opt-in'
                    });
                }
                
                // Form submission handling
                const formData = new FormData(this);
                console.log('Form submitted:', {
                    name: formData.get('name'),
                    email: formData.get('email')
                });
                
                // Show success message
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                alert('Thank you! Your eBook will be delivered to your email shortly.');
                this.reset();
            } else {
                errorElement.textContent = 'Please fill in all fields correctly';
                errorElement.style.display = 'block';
            }
        });
    }

    // CTA Click Tracking
    function trackCTAClicks() {
        document.querySelectorAll('a[href*="whatsapp"]').forEach(btn => {
            btn.addEventListener('click', function() {
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'conversion', {
                        'event_category': 'CTA',
                        'event_label': 'WhatsApp Click'
                    });
                }
                console.log('WhatsApp CTA clicked');
            });
        });
    }

    // Smooth Scrolling
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Initialize all functionality
    initializeCountdown();
    setupFormValidation();
    trackCTAClicks();
    setupSmoothScrolling();
});
