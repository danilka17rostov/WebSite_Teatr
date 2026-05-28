// ========== ДАННЫЕ ОТЗЫВОВ ==========
const reviewsData = [
    {
        rating: 5,
        text: "Невероятная атмосфера! Были на \"Сне в летнюю ночь\" — спектакль завораживает. Декорации, костюмы, игра актёров — всё на высшем уровне. Обязательно придём ещё!",
        author: "Анна, Санкт-Петербург",
        date: "15 мая 2025"
    },
    {
        rating: 5,
        text: "Театр \"Феерия\" — это открытие для меня. Очень душевные постановки, видно, что артисты живут на сцене. Рекомендую всем любителям настоящего театра.",
        author: "Михаил, Москва",
        date: "10 мая 2025"
    },
    {
        rating: 5,
        text: "Ходили всей семьёй на \"Щелкунчика\". Дети в восторге! Красиво, волшебно, профессионально. Спасибо за праздник!",
        author: "Екатерина, Нижний Новгород",
        date: "5 мая 2026"
    },
    {
        rating: 5,
        text: "Потрясающий театр! Были на \"Ромео и Джульетта\" - актёры играют так, что забываешь, где находишься. Обязательно вернёмся!",
        author: "Дмитрий, Санкт-Петербург",
        date: "28 апреля 2024"
    },
    {
        rating: 4,
        text: "Очень понравилась постановка \"Вишнёвый сад\". Глубокая, трогательная, заставляет задуматься. Рекомендую к просмотру.",
        author: "Ольга, Москва",
        date: "20 апреля 2026"
    },
    {
        rating: 5,
        text: "Лучший театр в городе! Каждый спектакль - это событие. Отдельное спасибо за \"Кармен-сюита\" - невероятная энергетика!",
        author: "Алексей, Санкт-Петербург",
        date: "15 апреля 2026"
    },
    {
        rating: 5,
        text: "Была на \"Трёх сёстрах\". Спектакль тронул до глубины души. Спасибо актёрам за такую пронзительную игру!",
        author: "Мария, Екатеринбург",
        date: "10 апреля 2026"
    },
    {
        rating: 5,
        text: "Великолепный \"Гамлет\"! Мощная режиссура, талантливые актёры. Один из лучших спектаклей, которые я видел.",
        author: "Константин, Санкт-Петербург",
        date: "5 апреля 2026"
    },
    {
        rating: 4,
        text: "Отличный театр! Уютный зал, внимательный персонал. \"Ревизор\" — очень смешно и актуально!",
        author: "Наталья, Новосибирск",
        date: "28 марта 2026"
    },
    {
        rating: 5,
        text: "Восторг! \"Сон в летнюю ночь\" — это магия. Спасибо за прекрасный вечер. Обязательно придём снова.",
        author: "Иван, Санкт-Петербург",
        date: "20 марта 2026"
    },
    {
        rating: 5,
        text: "Театр \"Феерия\" открыл для меня новый мир. Каждая постановка — это произведение искусства. Спасибо!",
        author: "Елена, Казань",
        date: "15 марта 2026"
    },
    {
        rating: 5,
        text: "Хожу в этот театр уже 3 года. Ни разу не разочаровали! Всегда интересные постановки и талантливые актёры.",
        author: "Сергей, Санкт-Петербург",
        date: "10 марта 2026"
    }
];

let currentIndex = 0;
let itemsPerView = 3;
let autoPlayInterval = null;
const autoPlayDelay = 5000;

// ========== ОПРЕДЕЛЕНИЕ КОЛИЧЕСТВА ЭЛЕМЕНТОВ ==========
function getItemsPerView() {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
}

// ========== СТАРТ АВТОПРОКРУТКИ ==========
function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
        const totalSlides = Math.ceil(reviewsData.length / itemsPerView);
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
        updateDots();
    }, autoPlayDelay);
}

// ========== ОСТАНОВКА АВТОПРОКРУТКИ ==========
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// ========== ОТОБРАЖЕНИЕ РЕЙТИНГА ==========
function renderRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// ========== ОТОБРАЖЕНИЕ ОТЗЫВОВ ==========
function renderReviews() {
    const track = document.getElementById('reviewTrack');
    const dotsContainer = document.getElementById('reviewDots');
    
    itemsPerView = getItemsPerView();
    
    track.innerHTML = reviewsData.map(review => `
        <div class="review-card-carousel">
            <div class="review-header">
                <div class="review-rating">
                    ${renderRating(review.rating)}
                </div>
                <div class="review-date">
                    <i class="far fa-calendar-alt"></i> ${review.date}
                </div>
            </div>
            <p class="review-text">“${review.text}”</p>
            <div class="review-author">
                <div class="author-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="author-info">
                    <span class="author-name">${review.author}</span>
                    <span class="author-status">Зритель театра</span>
                </div>
            </div>
        </div>
    `).join('');
    
    updateTrackWidth();
    
    const totalDots = Math.ceil(reviewsData.length / itemsPerView);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(i);
            startAutoPlay();
        });
        dotsContainer.appendChild(dot);
    }
    
    updateCarousel();
}

// ========== ОБНОВЛЕНИЕ ШИРИНЫ ТРЕКА ==========
function updateTrackWidth() {
    const track = document.getElementById('reviewTrack');
    const container = document.querySelector('.carousel-container');
    
    if (container && track) {
        const containerWidth = container.clientWidth;
        const cards = document.querySelectorAll('.review-card-carousel');
        
        if (cards.length > 0) {
            const gap = 24;
            const cardWidth = (containerWidth - (itemsPerView - 1) * gap) / itemsPerView;
            
            cards.forEach(card => {
                card.style.width = `${cardWidth}px`;
                card.style.flex = `0 0 ${cardWidth}px`;
            });
            
            const trackWidth = cards.length * (cardWidth + gap);
            track.style.width = `${trackWidth}px`;
        }
    }
}

// ========== ОБНОВЛЕНИЕ КАРУСЕЛИ ==========
function updateCarousel() {
    const track = document.getElementById('reviewTrack');
    const container = document.querySelector('.carousel-container');
    
    if (container && track) {
        const containerWidth = container.clientWidth;
        const cards = document.querySelectorAll('.review-card-carousel');
        
        if (cards.length > 0) {
            const gap = 24;
            const cardWidth = (containerWidth - (itemsPerView - 1) * gap) / itemsPerView;
            const slideWidth = cardWidth + gap;
            const offset = currentIndex * slideWidth * itemsPerView;
            
            track.style.transform = `translateX(-${offset}px)`;
        }
    }
}

// ========== ОБНОВЛЕНИЕ ТОЧЕК ==========
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// ========== ПЕРЕХОД К СЛАЙДУ ==========
function goToSlide(index) {
    const totalSlides = Math.ceil(reviewsData.length / itemsPerView);
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentIndex = index;
    updateCarousel();
    updateDots();
}

// ========== СЛЕДУЮЩИЙ СЛАЙД ==========
function nextSlide() {
    stopAutoPlay();
    const totalSlides = Math.ceil(reviewsData.length / itemsPerView);
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
    updateDots();
    startAutoPlay();
}

// ========== ПРЕДЫДУЩИЙ СЛАЙД ==========
function prevSlide() {
    stopAutoPlay();
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        const totalSlides = Math.ceil(reviewsData.length / itemsPerView);
        currentIndex = totalSlides - 1;
    }
    updateCarousel();
    updateDots();
    startAutoPlay();
}

// ========== МОДАЛЬНОЕ ОКНО БИЛЕТОВ ==========
function openTicketModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeTicketModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
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

// ========== ОБРАБОТЧИК РАЗМЕРА ОКНА ==========
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const newItemsPerView = getItemsPerView();
        if (newItemsPerView !== itemsPerView) {
            itemsPerView = newItemsPerView;
            currentIndex = 0;
            renderReviews();
        } else {
            updateTrackWidth();
            updateCarousel();
        }
    }, 200);
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    initBurger();
    renderReviews();
    startAutoPlay();
    
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    window.addEventListener('resize', handleResize);
    
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
