document.addEventListener('DOMContentLoaded', () => {

    // 1. File Upload Logic
    const fileInput = document.getElementById('file-upload');
    const uploadText = document.getElementById('upload-text');
    const uploadBox = document.querySelector('.file-upload-box');

    if(fileInput) {
        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                const name = this.files[0].name;
                uploadText.innerHTML = `
                    <i class="fa-solid fa-circle-check" style="color: #2ecc71;"></i>
                    <span style="color: #333;">${name}</span>
                `;
                uploadBox.style.borderColor = '#2ecc71';
            }
        });
    }

    // 2. Form Submission Logic
    const form = document.querySelector('.college-form');
    const modal = document.getElementById('success-modal');
    
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page reload

            // Get the name for the modal
            const collectorNameInput = form.querySelector('input[type="text"]');
            const nameDisplay = document.getElementById('collector-name-display');
            
            if(collectorNameInput && nameDisplay) {
                nameDisplay.textContent = collectorNameInput.value || "Collector";
            }

            // Show the Modal
            modal.classList.add('active');

            // --- REFRESH/RESET LOGIC STARTS HERE ---
            
            // 1. Clear all standard inputs (Text, Date, Select)
            form.reset();

            // 2. Manually reset the custom File Upload UI
            if(uploadText && uploadBox) {
                uploadText.innerHTML = `
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <span>Upload Image (Optional)</span>
                `;
                uploadBox.style.borderColor = '#ddd'; // Reset border color
            }
        });
    }

});

// 3. Function to Close Modal
function closeModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.remove('active');
}