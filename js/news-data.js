// ========== ЗАГРУЗКА НОВОСТЕЙ НА ГЛАВНУЮ ==========
function loadHomeNews() {
    const newsGrid = document.getElementById('homeNewsGrid');
    if (!newsGrid) return;
    
    const latestNews = getLatestNews(3);
    
    newsGrid.innerHTML = latestNews.map(news => `
        <div class="news-card" data-id="${news.id}">
            <div class="news-image" style="background-image: url('${news.image}')">
                <span class="news-category">${news.categoryName}</span>
            </div>
            <div class="news-content">
                <div class="news-date">
                    <i class="far fa-calendar-alt"></i>
                    <span>${news.date}</span>
                </div>
                <h3>${news.title}</h3>
                <p>${news.excerpt}</p>
                <div class="news-readmore">
                    Читать подробнее <i class="fas fa-arrow-right"></i>
                </div>
            </div>
        </div>
    `).join('');
    
    // Добавляем обработчики на карточки новостей
    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const id = parseInt(card.getAttribute('data-id'));
            const news = getNewsById(id);
            if (news) {
                openNewsModal(news);
            }
        });
    });
}

// ========== ОТКРЫТИЕ МОДАЛЬНОГО ОКНА С НОВОСТЬЮ ==========
function openNewsModal(news) {
    const modal = document.getElementById('newsModalOverlay');
    const modalContent = document.getElementById('newsModalContent');
    
    modalContent.innerHTML = `
        <div class="news-modal-image" style="background-image: url('${news.image}')"></div>
        <div class="news-modal-category">${news.categoryName}</div>
        <div class="news-modal-date">
            <i class="far fa-calendar-alt"></i>
            <span>${news.date}</span>
        </div>
        <h2 class="news-modal-title">${news.title}</h2>
        <div class="news-modal-fulltext">
            ${news.fullText}
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ========== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА НОВОСТИ ==========
function closeNewsModal() {
    const modal = document.getElementById('newsModalOverlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========== МОДАЛЬНОЕ ОКНО БИЛЕТОВ ==========
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

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Загружаем новости
    loadHomeNews();
    
    // Модальное окно новостей
    const newsModalOverlay = document.getElementById('newsModalOverlay');
    const newsModalClose = document.getElementById('newsModalClose');
    
    if (newsModalClose) {
        newsModalClose.addEventListener('click', closeNewsModal);
    }
    if (newsModalOverlay) {
        newsModalOverlay.addEventListener('click', (e) => {
            if (e.target === newsModalOverlay) closeNewsModal();
        });
    }
    
    // Модальное окно билетов
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
