document.addEventListener("DOMContentLoaded", () => {
    
    // --- Elements ---
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const itemsGrid = document.getElementById('itemsGrid');
    const emptyState = document.getElementById('emptyState');
    const itemCards = document.querySelectorAll('.item-card');

    // --- 1. AUTO-COUNT STATS ---
    function updateStats() {
        const total = itemCards.length;
        const lost = document.querySelectorAll('.item-card[data-type="lost"]').length;
        const found = document.querySelectorAll('.item-card[data-type="found"]').length;
        document.getElementById('total-count').textContent = total;
        document.getElementById('lost-count').textContent = lost;
        document.getElementById('found-count').textContent = found;
    }

    // --- 2. SEARCH & FILTER LOGIC ---
    function filterItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterType = filterSelect.value;
        let visibleCount = 0;

        itemCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            const category = card.getAttribute('data-category').toLowerCase();
            const cardType = card.getAttribute('data-type'); 

            const matchesSearch = title.includes(searchTerm) || category.includes(searchTerm);
            const matchesType = (filterType === 'all') || (filterType === cardType);

            if (matchesSearch && matchesType) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Toggle Empty State
        if (visibleCount === 0) {
            itemsGrid.style.display = 'none';
            emptyState.classList.add('visible');
            
            if(searchTerm) {
                document.getElementById('empty-title').textContent = "No Search Results";
                document.getElementById('empty-desc').innerHTML = `No items match "<b>${searchTerm}</b>".`;
            } else {
                document.getElementById('empty-title').textContent = "No Items Found";
                document.getElementById('empty-desc').textContent = "There are no items matching this category.";
            }
        } else {
            itemsGrid.style.display = 'grid';
            emptyState.classList.remove('visible');
        }
    }

    // --- 3. DETAILS MODAL POPULATOR ---
    const modal = document.getElementById('details-modal');
    // Triggers on BOTH "View Details" button AND the Image wrapper
    const triggers = document.querySelectorAll('.view-btn, .js-open-modal');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Find parent card regardless of what was clicked
            const card = e.target.closest('.item-card');

            // Populate Text
            document.getElementById('modal-title').textContent = card.getAttribute('data-title');
            document.getElementById('modal-category').textContent = card.getAttribute('data-category');
            document.getElementById('modal-desc').textContent = card.getAttribute('data-desc');
            
            document.querySelector('#modal-date span').textContent = card.getAttribute('data-date');
            document.querySelector('#modal-location span').textContent = card.getAttribute('data-location');
            document.querySelector('#modal-collector span').textContent = card.getAttribute('data-collector');
            document.querySelector('#modal-phone span').textContent = card.getAttribute('data-phone');
            document.querySelector('#modal-email span').textContent = card.getAttribute('data-email');

            // Set Status Color
            const status = card.getAttribute('data-status');
            const statusBadge = document.getElementById('modal-status');
            statusBadge.textContent = status;
            statusBadge.style.background = status.toLowerCase() === 'lost' ? '#ff9f76' : '#2ecc71';

            // Set Image or Placeholder
            const imageSrc = card.getAttribute('data-image');
            const imgEl = document.getElementById('modal-img');
            const noImgEl = document.getElementById('modal-no-img');
            
            if (imageSrc && imageSrc.trim() !== "") {
                imgEl.src = imageSrc; imgEl.style.display = 'block'; noImgEl.style.display = 'none';
            } else {
                imgEl.style.display = 'none'; noImgEl.style.display = 'flex';
            }

            modal.classList.add('active');
        });
    });

    // --- 4. SCROLL ANIMATION ---
    const animatedCards = document.querySelectorAll('.js-scroll-anim');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => { entry.target.classList.add('is-visible'); }, index * 100); 
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedCards.forEach(card => observer.observe(card));

    // --- 5. INITIALIZATION ---
    updateStats(); // Count items on load
    
    // Add Listeners
    searchInput.addEventListener('keyup', filterItems);
    filterSelect.addEventListener('change', filterItems);
});

// Helper Functions
function closeDetailsModal() { document.getElementById('details-modal').classList.remove('active'); }
function resetSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterSelect').value = 'all';
    document.getElementById('filterSelect').dispatchEvent(new Event('change'));
}