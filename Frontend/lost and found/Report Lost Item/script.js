document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('reportForm');
    const modal = document.getElementById('success-modal');
    const uploadInput = document.getElementById('file-upload');
    const uploadLabel = document.getElementById('upload-label');

    // Visual feedback for file upload
    if(uploadInput) {
        uploadInput.addEventListener('change', function() {
            if(this.files.length > 0) {
                const fileName = this.files[0].name;
                uploadLabel.style.borderColor = "#10b981";
                uploadLabel.style.backgroundColor = "#ecfdf5";
                
                const iconCircle = uploadLabel.querySelector('.icon-circle');
                iconCircle.style.backgroundColor = "#d1fae5";
                iconCircle.querySelector('i').className = "fa-solid fa-check";
                iconCircle.querySelector('i').style.color = "#10b981";

                const uploadText = uploadLabel.querySelector('.upload-text');
                uploadText.querySelector('span').textContent = fileName;
                uploadText.querySelector('small').textContent = "File selected successfully";
                uploadText.querySelector('small').style.color = "#10b981";
            }
        });
    }

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = document.querySelector('.submit-btn-modern');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';

            // 1. Get Data (Updated ID here)
            const nameValue = document.getElementById('name-input').value; // Changed ID
            const userEmail = document.getElementById('email-input').value;
            const itemName = document.getElementById('item-input').value;
            const dateLost = document.getElementById('date-input').value;
            const location = document.getElementById('location-input').value;

            // 2. Generate ID
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const refId = `#CLM-${new Date().getFullYear()}-${randomNum}`;

            // 3. Send to Backend
            fetch('http://localhost:5000/send-report', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // We map the new 'nameValue' to 'collectorName' 
                    // so your existing backend server still understands it.
                    collectorName: nameValue, 
                    userEmail: userEmail,
                    itemName: itemName,
                    refId: refId,
                    dateLost: dateLost,
                    location: location
                })
            })
            .then(response => {
                if(response.ok) {
                    document.getElementById('generated-ref-id').textContent = refId;
                    document.getElementById('user-email-display').textContent = userEmail;
                    modal.classList.add('active');
                    form.reset();
                } else {
                    alert('Error sending email. Is the backend running?');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Server error. Run "node server.js" in backend folder.');
            })
            .finally(() => {
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
            });
        });
    }
});

function closeModal() {
    document.getElementById('success-modal').classList.remove('active');
}