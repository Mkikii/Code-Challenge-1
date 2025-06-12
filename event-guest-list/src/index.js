document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const guestForm = document.getElementById('guest-form');
    const guestNameInput = document.getElementById('guest-name');
    const guestCategorySelect = document.getElementById('guest-category');
    const plusOneCheckbox = document.getElementById('plus-one');
    const guestList = document.getElementById('guest-list');
    const guestCount = document.getElementById('guest-count');
    const maxGuests = document.getElementById('max-guests');
    const searchInput = document.getElementById('search');
    const exportBtn = document.getElementById('export-btn');
    const importBtn = document.getElementById('import-btn');

    // Constants
    const MAX_GUESTS = 10;
    maxGuests.textContent = MAX_GUESTS;

    // State
    let guests = [];

    // Initialize
    loadGuests();
    renderGuestList();

    // Event Listeners
    guestForm.addEventListener('submit', handleFormSubmit);
    searchInput.addEventListener('input', handleSearch);
    exportBtn.addEventListener('click', exportGuestList);
    importBtn.addEventListener('click', importGuestList);

    // Core Functions
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const name = guestNameInput.value.trim();
        const category = guestCategorySelect.value;
        const hasPlusOne = plusOneCheckbox.checked;

        if (!name) {
            showAlert('Please enter a guest name');
            return;
        }

        if (guests.length >= MAX_GUESTS) {
            showAlert(`Maximum ${MAX_GUESTS} guests reached`);
            return;
        }

        addGuest(name, category, hasPlusOne);
        guestForm.reset();
        guestNameInput.focus();
    }

    function addGuest(name, category, hasPlusOne) {
        const newGuest = {
            id: Date.now(),
            name,
            category,
            hasPlusOne,
            attending: true,
            timestamp: new Date().toLocaleString()
        };

        guests.push(newGuest);
        saveGuests();
        renderGuestList();
    }

    function renderGuestList(filteredGuests = null) {
        const guestsToRender = filteredGuests || guests;
        guestList.innerHTML = '';
        guestCount.textContent = guests.length;

        if (guestsToRender.length === 0) {
            guestList.innerHTML = '<li class="empty-state">No guests found</li>';
            return;
        }

        guestsToRender.forEach(guest => {
            const guestItem = document.createElement('li');
            guestItem.className = `guest-item ${guest.attending ? 'attending' : 'not-attending'}`;
            guestItem.dataset.id = guest.id;

            guestItem.innerHTML = `
                <div class="guest-info">
                    <span class="guest-name">${guest.name}</span>
                    ${guest.hasPlusOne ? '<span class="plus-one-tag">+1</span>' : ''}
                    <span class="guest-category ${guest.category}">
                        ${getCategoryIcon(guest.category)} ${guest.category}
                    </span>
                    <span class="guest-time">${guest.timestamp}</span>
                </div>
                <div class="guest-actions">
                    <button class="toggle-btn" aria-label="Toggle attendance">
                        ${guest.attending ? '✅ Attending' : '❌ Not Attending'}
                    </button>
                    <button class="edit-btn" aria-label="Edit guest">✏️ Edit</button>
                    <button class="delete-btn" aria-label="Delete guest">🗑️ Delete</button>
                </div>
            `;

            guestList.appendChild(guestItem);
        });

        // Add event listeners to all buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', handleDelete);
        });

        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', handleToggle);
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', handleEdit);
        });
    }

    // Helper Functions
    function getCategoryIcon(category) {
        const icons = {
            friend: '👫',
            family: '👪',
            colleague: '💼',
            vip: '⭐'
        };
        return icons[category] || '🎭';
    }

    function handleDelete(e) {
        const id = parseInt(e.target.closest('li').dataset.id);
        guests = guests.filter(guest => guest.id !== id);
        saveGuests();
        renderGuestList();
    }

    function handleToggle(e) {
        const id = parseInt(e.target.closest('li').dataset.id);
        guests = guests.map(guest => 
            guest.id === id ? {...guest, attending: !guest.attending} : guest
        );
        saveGuests();
        renderGuestList();
    }

    function handleEdit(e) {
        const id = parseInt(e.target.closest('li').dataset.id);
        const guest = guests.find(g => g.id === id);
        const newName = prompt('Edit guest name:', guest.name);
        
        if (newName && newName.trim() !== '') {
            guest.name = newName.trim();
            saveGuests();
            renderGuestList();
        }
    }

    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const filtered = guests.filter(guest => 
            guest.name.toLowerCase().includes(searchTerm)
        );
        renderGuestList(filtered);
    }

    function exportGuestList() {
        const data = JSON.stringify(guests, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `guest-list_${new Date().toISOString().slice(0,10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function importGuestList() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = e => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = event => {
                try {
                    const importedGuests = JSON.parse(event.target.result);
                    if (Array.isArray(importedGuests)) {
                        guests = importedGuests.slice(0, MAX_GUESTS);
                        saveGuests();
                        renderGuestList();
                        showAlert(`Imported ${guests.length} guests`);
                    } else {
                        throw new Error('Invalid format');
                    }
                } catch (error) {
                    showAlert('Error: Invalid guest list file');
                }
            };
            reader.readAsText(file);
        };
        
        input.click();
    }

    function loadGuests() {
        const savedGuests = localStorage.getItem('guests');
        if (savedGuests) {
            try {
                guests = JSON.parse(savedGuests);
            } catch {
                localStorage.removeItem('guests');
            }
        }
    }

    function saveGuests() {
        localStorage.setItem('guests', JSON.stringify(guests));
    }

    function showAlert(message) {
        const alert = document.createElement('div');
        alert.className = 'alert';
        alert.textContent = message;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.add('fade-out');
            setTimeout(() => alert.remove(), 300);
        }, 2000);
    }
});