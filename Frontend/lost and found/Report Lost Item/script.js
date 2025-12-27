document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('reportForm');
    const modal = document.getElementById('success-modal');

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // 1. Stop page reload

            // 2. Change Button Text to "Sending..."
            const btn = document.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

            // 3. Get Data
            const collectorName = document.getElementById('collector-input').value;
            const userEmail = document.getElementById('email-input').value;
            const itemName = document.getElementById('item-input').value;
            const dateLost = document.getElementById('date-input').value;
            const location = document.getElementById('location-input').value;

            // 4. Generate Unique ID
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const refId = `#CLM-${new Date().getFullYear()}-${randomNum}`;

            // 5. Send to Backend
            fetch('http://localhost:5000/send-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail, collectorName, itemName, refId, dateLost, location
                })
            })
            .then(response => {
                if(response.ok) {
                    // 6. Update & Show Modal
                    document.getElementById('generated-ref-id').textContent = refId;
                    document.getElementById('user-email-display').textContent = userEmail;
                    modal.classList.add('active');
                    form.reset(); // Clear form
                } else {
                    alert('Error: Could not send email. Check console.');
                }
            })
            .catch(error => {
                console.error(error);
                alert('Server Error. Make sure backend is running.');
            })
            .finally(() => {
                btn.innerHTML = originalText; // Reset button text
            });
        });
    }
});

function closeModal() {
    document.getElementById('success-modal').classList.remove('active');
}