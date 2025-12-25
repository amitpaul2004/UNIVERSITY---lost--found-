document.addEventListener("DOMContentLoaded", () => {
    
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const itemsGrid = document.getElementById('itemsGrid');
    const emptyState = document.getElementById('emptyState');
    const itemCards = document.querySelectorAll('.item-card');

    // --- 1. NEW: AUTO-COUNT STATS ---
    function updateStats() {
        const total = itemCards.length;
        // Count cards that have data-type="lost"
        const lost = document.querySelectorAll('.item-card[data-type="lost"]').length;
        // Count cards that have data-type="found"
        const found = document.querySelectorAll('.item-card[data-type="found"]').length;

        // Update the HTML
        document.getElementById('total-count').textContent = total;
        document.getElementById('lost-count').textContent = lost;
        document.getElementById('found-count').textContent = found;
    }

    // --- 2. FILTER & SEARCH ---
    function filterItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterType = filterSelect.value;
        let visibleCount = 0;

        itemCards.forEach(card => {
            const title = card.querySelector('.item-title').textContent.toLowerCase();
            const category = card.querySelector('.item-category').textContent.toLowerCase();
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

    // --- 3. LISTENERS ---
    searchInput.addEventListener('keyup', filterItems);
    filterSelect.addEventListener('change', filterItems);

    // --- 4. ANIMATION ---
    const animatedCards = document.querySelectorAll('.js-scroll-anim');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100); 
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedCards.forEach(card => observer.observe(card));

    // --- 5. INITIALIZE ---
    updateStats(); // <--- This runs once on load to calculate numbers!
    filterItems(); // Checks if empty state is needed

});

function resetSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('filterSelect').value = 'all';
    document.getElementById('filterSelect').dispatchEvent(new Event('change'));
}