document.addEventListener('DOMContentLoaded', function() {
    // Set the countdown time (48 hours from now)
    const countdownTime = new Date();
    countdownTime.setHours(countdownTime.getHours() + 48);

    // Update countdown every second
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownTime - now;

        // Calculate hours, minutes, seconds
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Update header timer
        document.getElementById('hours').textContent = hours;

        // If the countdown is finished
        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = "OFFER EXPIRED";
        }
    }, 1000);

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.step, .testimonial-card, .ebook-image-placeholder');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.step, .testimonial-card, .ebook-image-placeholder').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });

    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // WhatsApp button click tracking
    document.querySelectorAll('a[href*="whatsapp"]').forEach(button => {
        button.addEventListener('click', function() {
            // In a real implementation, you would track this conversion
            console.log('WhatsApp button clicked - conversion tracked');
        });
    });
});
