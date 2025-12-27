//node server.js
//  \Frontend\lost and found\Report Lost Item>node server.js





document.addEventListener('DOMContentLoaded', () => {
    
    // 1. File Upload Logic
    const fileInput = document.getElementById('file-upload');
    const uploadText = document.getElementById('upload-text');

    if(fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                const name = this.files[0].name;
                uploadText.innerHTML = `
                    <i class="fa-solid fa-circle-check" style="color: #2ecc71;"></i>
                    <span style="color: #333;">${name}</span>
                `;
                document.querySelector('.file-upload-box').style.borderColor = '#2ecc71';
            }
        });
    }

    // 2. Form Submission Logic
    const form = document.querySelector('.college-form');
    const modal = document.getElementById('success-modal');
    
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page reload

            // A. Generate Unique Reference ID
            const currentYear = new Date().getFullYear();
            const randomNum = Math.floor(1000 + Math.random() * 9000); 
            const uniqueID = `#CLM-${currentYear}-${randomNum}`;

            // B. Get User Input Values
            const emailInput = document.getElementById('email-input').value;
            // (Optional) You can capture the collector name here too if needed

            // C. Update Modal Content
            document.getElementById('generated-ref-id').textContent = uniqueID;
            document.getElementById('user-email-display').textContent = emailInput;

            // D. Show Modal
            modal.classList.add('active');
        });
    }

});

// 3. Close Modal
function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('active');
    
    // Reset form
    document.querySelector('.college-form').reset();
}
const form = document.querySelector('.college-form');
    const modal = document.getElementById('success-modal');

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page reload

            // 1. Gather Data from Input Fields
            const collectorName = document.getElementById('collector-input').value;
            const userEmail = document.getElementById('email-input').value; // <--- This gets the user's specific email
            const itemName = form.querySelector('input[placeholder="e.g. Blue Backpack"]').value;
             
        const dateLost = form.querySelector('input[type="date"]').value;
const location = form.querySelector('input[placeholder="e.g. Library 2nd Floor"]').value;

            // 2. Generate ID
            const randomNum = Math.floor(1000 + Math.random() * 9000); 
            const uniqueID = `#CLM-${new Date().getFullYear()}-${randomNum}`;

            // 3. Update Modal Text
            document.getElementById('generated-ref-id').textContent = uniqueID;
            document.getElementById('user-email-display').textContent = userEmail;

            // 4. SEND TO BACKEND SERVER
            // We are creating a "package" of data to send
            fetch('http://localhost:5000/send-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: userEmail,       // Sending the dynamic email
                    collectorName: collectorName,
                    itemName: itemName,
                    refId: uniqueID,
                    
                    dateLost: dateLost,
                    location: location
                })
            })
            .then(response => {
                if(response.ok) {
                    console.log("Email sent!");
                    modal.classList.add('active'); // Show success modal only if email works
                } else {
                    alert("Server error: Could not send email.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Is your server running? Run 'node server.js' in terminal.");
            });
        });
    }