document.addEventListener('DOMContentLoaded', function() {
    // Persistent Countdown Timer
    function initializeCountdown() {
        const countdownKey = 'vikkahub_countdown_end';
        let endTime;
        
        // Check for existing timer in localStorage
        if(localStorage.getItem(countdownKey)) {
            endTime = parseInt(localStorage.getItem(countdownKey));
            // If timer expired, reset it
            if (Date.now() > endTime) {
                localStorage.removeItem(countdownKey);
                initializeCountdown(); // Restart
                return;
            }
        } else {
            // Set new 48-hour timer
            endTime = Date.now() + (48 * 60 * 60 * 1000);
            localStorage.setItem(countdownKey, endTime.toString());
        }
        
        // Update countdown every second
        const timer = setInterval(function() {
            const now = Date.now();
            const remaining = endTime - now;
            
            if (remaining <= 0) {
                clearInterval(timer);
                document.querySelectorAll('.timer-container, .countdown-timer').forEach(el => {
                    el.innerHTML = '<span>OFFER EXPIRED</span>';
                });
                return;
            }
            
            // Calculate time units
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            
            // Update displays
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
        }, 1000);
    }
    
    // Track CTA clicks
    function trackConversion(type) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'event_category': 'CTA',
                'event_label': type
            });
        }
        console.log('Tracked:', type);
    }
    
    // WhatsApp CTA tracking
    document.querySelectorAll('a[href*="whatsapp"]').forEach(btn => {
        btn.addEventListener('click', () => trackConversion('WhatsApp CTA'));
    });
    
    // Email Form Submission
    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            
            // Track conversion
            trackConversion('Email Opt-in');
            
            // In production: Send to your email service
            console.log('Form submitted:', {
                name: formData.get('name'),
                email: formData.get('email')
            });
            
            // Show confirmation
            alert('Thank you! Your eBook will be delivered to your email shortly.');
            this.reset();
        });
    }
    
    // Initialize countdown
    initializeCountdown();
    
    // Smooth scrolling for navigation
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
});
