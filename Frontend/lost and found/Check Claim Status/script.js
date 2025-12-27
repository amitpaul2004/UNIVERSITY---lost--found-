// --- JAVASCRIPT ANIMATION & LOGIC ---

function fetchClaimStatus() {
    const input = document.getElementById('claimInput').value.trim();
    const resultCard = document.getElementById('result-card');
    const displayRef = document.getElementById('display-ref');
    const itemName = document.getElementById('item-name');
    const badge = document.getElementById('main-status-badge');
    const line = document.getElementById('progress-line');
    
    // Select Steps
    const steps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3'),
        document.getElementById('step-4')
    ];

    // Reset Animation (Clear previous search)
    resultCard.classList.remove('active');
    line.style.width = '0%';
    steps.forEach(step => step.classList.remove('active'));

    // Validation
    if (!input) {
        alert("Please enter a valid Reference ID");
        return;
    }

    // --- MOCK LOGIC FOR DEMO ---
    // In a real app, you would fetch data from a database here.
    
    // 1. Simulate Loading
    const btn = document.querySelector('.track-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Finding...`;

    setTimeout(() => {
        // Show Card
        resultCard.classList.add('active');
        displayRef.textContent = input.toUpperCase();
        btn.innerHTML = originalText;

        // Determine Status based on Input (Demo logic)
        // Checks if input contains '002' or '003' to show different states
        
        let progress = 0; // 0 to 100%

        if (input.includes('003')) {
            // REJECTED SCENARIO
            itemName.textContent = "Lost ID Card (Rejected)";
            badge.className = 'status-pill rejected';
            badge.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Rejected`;
            progress = 50; // Stops at step 2
            animateTimeline(steps, 2); // Only light up first 2 steps
        } 
        else if (input.includes('002')) {
            // COMPLETED SCENARIO
            itemName.textContent = "Dell Laptop (Ready)";
            badge.className = 'status-pill success';
            badge.innerHTML = `<i class="fa-solid fa-check-circle"></i> Ready for Pickup`;
            progress = 100;
            animateTimeline(steps, 4); // Light up all steps
        } 
        else {
            // DEFAULT / PENDING SCENARIO
            itemName.textContent = "Blue Nike Backpack";
            badge.className = 'status-pill pending';
            badge.innerHTML = `<i class="fa-solid fa-clock"></i> Under Review`;
            progress = 50; 
            animateTimeline(steps, 2); // Light up first 2 steps
        }

        // Animate the Line Width
        setTimeout(() => {
            line.style.width = `${progress}%`;
        }, 300); // Slight delay after card appears

    }, 800); // Fake API delay
}

// Function to cascade the active class on timeline steps
function animateTimeline(steps, count) {
    steps.forEach((step, index) => {
        if (index < count) {
            setTimeout(() => {
                step.classList.add('active');
            }, index * 400); // 400ms delay between each step lighting up
        }
    });
}