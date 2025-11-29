// Фильтрация карточек по странам
document.addEventListener('DOMContentLoaded', function() {
    // Находим элементы фильтров в основной секции
    const filterItems = document.querySelectorAll('.cards-header ul li');
    // Находим элементы фильтров в футере
    const footerFilters = document.querySelectorAll('.one-list:first-child ul li');
    // Находим все карточки
    const cards = document.querySelectorAll('.all-cards .card');
    
    // Переменная для отслеживания активного фильтра
    let activeFilter = null;
    
    // Функция для показа всех карточек
    function showAllCards() {
        cards.forEach(card => {
            card.style.display = 'block';
        });
        activeFilter = null;
    }
    
    // Функция для фильтрации карточек
    function filterCards(country) {
        // Сначала скрываем все
        cards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Показываем нужные карточки
        switch(country) {
            case 'Франция':
                if (cards[0]) cards[0].style.display = 'block';
                if (cards[1]) cards[1].style.display = 'block';
                break;
            case 'Германия':
                if (cards[2]) cards[2].style.display = 'block';
                if (cards[3]) cards[3].style.display = 'block';
                break;
            case 'Англия':
                if (cards[4]) cards[4].style.display = 'block';
                if (cards[5]) cards[5].style.display = 'block';
                break;
        }
        
        activeFilter = country;
    }
    
    // Функция для обновления активного состояния
    function setActiveFilter(country, clickedElement) {
        // Снимаем активное состояние со всех фильтров
        filterItems.forEach(item => {
            item.classList.remove('active');
        });
        footerFilters.forEach(item => {
            item.classList.remove('active');
        });
        
        // Если передан country, устанавливаем активное состояние
        if (country) {
            // Активируем в основной секции
            filterItems.forEach(item => {
                if (item.textContent.trim() === country) {
                    item.classList.add('active');
                }
            });
            
            // Активируем в футере
            footerFilters.forEach(item => {
                if (item.textContent.trim() === country) {
                    item.classList.add('active');
                }
            });
        }
        // Если country не передан (сброс фильтра), все элементы остаются неактивными
    }
    
    // Функция обработки клика по фильтру
    function handleFilterClick(country, element) {
        // Если кликаем на уже активный фильтр - сбрасываем фильтр
        if (activeFilter === country) {
            showAllCards();
            setActiveFilter(null);
        } else {
            // Иначе применяем новый фильтр
            filterCards(country);
            setActiveFilter(country);
        }
        
        // Прокручиваем к секции с картинами
        const paintingSection = document.getElementById('painting');
        if (paintingSection) {
            const offsetTop = paintingSection.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    
    // Добавляем обработчики для фильтров в основной секции
    filterItems.forEach(item => {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function() {
            const filterText = this.textContent.trim();
            handleFilterClick(filterText, this);
        });
    });
    
    // Добавляем обработчики для фильтров в футере
    footerFilters.forEach(item => {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем переход по ссылке
            const filterText = this.textContent.trim();
            handleFilterClick(filterText, this);
        });
    });
    
    // Изначально показываем все карточки
    showAllCards();
    
    // Плавная прокрутка для остальных якорных ссылок
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        // Пропускаем ссылки, которые уже обрабатываются как фильтры
        if (link.closest('.one-list:first-child ul')) {
            return;
        }
        
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});