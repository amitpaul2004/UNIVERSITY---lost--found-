document.addEventListener("DOMContentLoaded", () => {
    
    const cards = document.querySelectorAll('.grid-card');

    const observerOptions = {
        root: null, 
        threshold: 0.1, 
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                
                // Staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100); 

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
});