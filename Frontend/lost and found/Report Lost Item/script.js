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