document.addEventListener("DOMContentLoaded", () => {
    // Select all cards
    const cards = document.querySelectorAll('.grid-card');

    // Loop through each card
    cards.forEach((card, index) => {
        // Set a timeout based on the index (0ms, 200ms, 400ms, 600ms)
        setTimeout(() => {
            // Add the class that forces the CSS to animate opacity and position
            card.classList.add('fade-in');
        }, index * 200); 
    });
});