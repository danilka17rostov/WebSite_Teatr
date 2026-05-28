// ========== ИНИЦИАЛИЗАЦИЯ КАРТЫ ==========
let map;

function initMap() {
    const theatreLat = 59.9343;
    const theatreLng = 30.3351;
    
    map = L.map('map').setView([theatreLat, theatreLng], 16);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 10
    }).addTo(map);
    
    const theatreIcon = L.divIcon({
        html: '<div style="animation: bounce 2s infinite;"><i class="fas fa-theater-masks" style="font-size: 36px; color: #d4b57e; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));"></i></div>',
        className: 'custom-marker',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
    });
    
    const marker = L.marker([theatreLat, theatreLng], { icon: theatreIcon }).addTo(map);
    
    marker.bindPopup(`
        <div style="font-family: 'Inter', sans-serif; text-align: center; padding: 5px;">
            <strong style="font-family: 'Playfair Display', serif; font-size: 16px; color: #3d2c1c;">Театр «Феерия»</strong><br>
            <span style="font-size: 12px; color: #8b7a66;">📍 Невский пр., 88</span><br>
            <span style="font-size: 11px; color: #b58b48;">5 минут от метро</span>
        </div>
    `).openPopup();
}

// ========== ПЛАВНЫЙ СКРОЛЛ К КАРТЕ ==========
function scrollToMap() {
    const mapSection = document.getElementById('mapSection');
    if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ========== МОДАЛЬНЫЕ ОКНА ==========
function openTicketModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTicketModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========== БУРГЕР-МЕНЮ ==========
function initBurger() {
    const btn = document.getElementById('burgerBtn');
    const menu = document.getElementById('mobileMenu');
    
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('active');
            const spans = btn.querySelectorAll('span');
            if (menu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                const spans = btn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    initBurger();
    initMap();
    
    const showMapBtn = document.getElementById('showMapBtn');
    if (showMapBtn) {
        showMapBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToMap();
        });
    }
    
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalOkBtn = document.getElementById('modalOkBtn');
    const mainBuyBtn = document.getElementById('mainBuyBtn');
    const mobileBuyBtn = document.getElementById('mobileBuyBtn');
    
    if (modalClose) modalClose.addEventListener('click', closeTicketModal);
    if (modalOkBtn) modalOkBtn.addEventListener('click', closeTicketModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeTicketModal();
        });
    }
    
    if (mainBuyBtn) {
        mainBuyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openTicketModal();
        });
    }
    
    if (mobileBuyBtn) {
        mobileBuyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openTicketModal();
        });
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    .custom-marker {
        background: none;
        border: none;
    }
    .leaflet-popup-content-wrapper {
        border-radius: 16px;
        background: #fff;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }
    .leaflet-popup-tip {
        background: #fff;
    }
`;
document.head.appendChild(style);