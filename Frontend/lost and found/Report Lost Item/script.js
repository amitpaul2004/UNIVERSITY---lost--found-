document.addEventListener('DOMContentLoaded', () => {
    
    const fileInput = document.getElementById('file-upload');
    const uploadText = document.getElementById('upload-text');

    fileInput.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            const name = this.files[0].name;
            // Update the text to show the filename + a checkmark
            uploadText.innerHTML = `
                <i class="fa-solid fa-circle-check" style="color: #2ecc71;"></i>
                <span style="color: #333;">${name}</span>
            `;
            // Make border solid green to show success
            document.querySelector('.file-upload-box').style.borderColor = '#2ecc71';
        }
    });

});
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. File Upload Logic (Existing)
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

    // 2. Form Submission Logic (NEW)
    const form = document.querySelector('.college-form');
    const modal = document.getElementById('success-modal');
    
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the form from refreshing the page

            // Optional: Get the name the user typed to personalize the message
            // Assuming the first input is Collector Name based on previous code
            const collectorNameInput = form.querySelector('input[type="text"]'); 
            const nameDisplay = document.getElementById('collector-name-display');
            
            if(collectorNameInput && nameDisplay) {
                // If they typed a name, use it. Otherwise keep "Collector"
                nameDisplay.textContent = collectorNameInput.value || "Collector";
            }

            // Show the Modal
            modal.classList.add('active');
        });
    }

});

// 3. Function to Close Modal
function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('active');
    
    // Optional: Reset form or redirect after closing
    // document.querySelector('.college-form').reset();
    // window.location.href = 'index.html'; 
}