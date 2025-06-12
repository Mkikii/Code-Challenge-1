document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const guestForm = document.getElementById('guest-form');
    const guestNameInput = document.getElementById('guest-name');
    const guestCategorySelect = document.getElementById('guest-category');
    const guestList = document.getElementById('guest-list');
    const guestCount = document.getElementById('guest-count');
    
    // Guest array and constants
    let guests = [];
    const MAX_GUESTS = 10;
    
    // Load from localStorage
    if (localStorage.getItem('guests')) {
        guests = JSON.parse(localStorage.getItem('guests'));
        renderGuestList();
    }
    
    // Form submission
    guestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = guestNameInput.value.trim();
        const category = guestCategorySelect.value;
        
        if (!name) return;
        
        if (guests.length >= MAX_GUESTS) {
            alert(`Maximum ${MAX_GUESTS} guests allowed!`);
            return;
        }
        
        const newGuest = {
            id: Date.now(),
            name,
            category,
            attending: true,
            timestamp: new Date().toLocaleString()
        };
        
        guests.push(newGuest);
        saveGuests();
        renderGuestList();
        
        // Reset form
        guestNameInput.value = '';
        guestNameInput.focus();
    });
    
    // Render guest list
    function renderGuestList() {
        guestList.innerHTML = '';
        guestCount.textContent = guests.length;
        
        if (guests.length === 0) {
            guestList.innerHTML = '<li>No guests added yet</li>';
            return;
        }
        
        guests.forEach(guest => {
            const li = document.createElement('li');
            li.className = `guest-item ${guest.attending ? 'attending' : 'not-attending'}`;
            li.dataset.id = guest.id;
            
            li.innerHTML = `
                <div class="guest-info">
                    <span class="guest-name">${guest.name}</span>
                    <span class="guest-category ${guest.category}">${guest.category}</span>
                    <span class="guest-time">Added: ${guest.timestamp}</span>
                </div>
                <div class="guest-actions">
                    <button class="toggle-btn">${guest.attending ? 'Attending' : 'Not Attending'}</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            
            guestList.appendChild(li);
        });
        
        // Add event listeners
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
    
    // Event handlers
    function handleDelete(e) {
        const id = parseInt(e.target.closest('li').dataset.id);
        guests = guests.filter(guest => guest.id !== id);
        saveGuests();
        renderGuestList();
    }
    
    function handleToggle(e) {
        const id = parseInt(e.target.closest('li').dataset.id);
        guests = guests.map(guest => {
            if (guest.id === id) {
                return {...guest, attending: !guest.attending};
            }
            return guest;
        });
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
    
    // Save to localStorage
    function saveGuests() {
        localStorage.setItem('guests', JSON.stringify(guests));
    }
});