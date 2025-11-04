// Funcionalidades interativas do site O Galpão

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Funcionalidade de busca
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                // Simular busca (você pode implementar busca real aqui)
                alert(`Buscando por: "${searchTerm}"`);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            
            if (name && email) {
                // Simular inscrição na newsletter
                alert(`Obrigado ${name}! Você foi inscrito na nossa newsletter.`);
                this.reset();
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
    
    // Botão "Como Chegar"
    const comoChegarBtn = document.querySelector('.btn-primary');
    if (comoChegarBtn && comoChegarBtn.textContent.includes('COMO CHEGAR')) {
        comoChegarBtn.addEventListener('click', function() {
            // Abrir Google Maps com o endereço da Pactual Imóveis
            const endereco = 'Av. Carlos Lacerda, 504, Campo Limpo, São Paulo, SP';
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`;
            window.open(mapsUrl, '_blank');
        });
    }
    
    // Animação de scroll para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animateElements = document.querySelectorAll('.service-card, .hero, .products-services, .showroom, .newsletter');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Adicionar efeito hover nos cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Funcionalidade de dropdown para mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (link && content) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    content.classList.toggle('show');
                }
            });
        }
    });
    
    // Fechar dropdown quando clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            const openDropdowns = document.querySelectorAll('.dropdown-content.show');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
    
    // Adicionar classe para animações CSS
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .hero, .products-services, .showroom, .newsletter {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                padding: 20px;
                flex-direction: column;
                gap: 20px;
            }
            
            .nav-menu.active {
                display: flex;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            .dropdown-content.show {
                display: flex !important;
                position: static;
                box-shadow: none;
                padding: 10px 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Função para rolar suavemente para o topo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Adicionar botão de voltar ao topo
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
        if (!document.querySelector('.back-to-top')) {
            const backToTopBtn = document.createElement('button');
            backToTopBtn.className = 'back-to-top';
            backToTopBtn.innerHTML = '↑';
            backToTopBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            `;
            
            backToTopBtn.addEventListener('click', scrollToTop);
            backToTopBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.backgroundColor = '#0056b3';
            });
            backToTopBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = '#007bff';
            });
            
            document.body.appendChild(backToTopBtn);
        }
    } else {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            backToTopBtn.remove();
        }
    }
});
// Carousel de propriedades
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('indicators');
    const cards = document.querySelectorAll('.property-card');
    
    if (!track || !prevBtn || !nextBtn) return; // Sai se não encontrar os elementos
    
    let currentIndex = 0;
    let cardsPerView = 3;
    
    // Calcular cards por visualização baseado na largura da tela
    function updateCardsPerView() {
        if (window.innerWidth <= 640) {
            cardsPerView = 1;
        } else if (window.innerWidth <= 968) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        updateCarousel();
        createIndicators();
    }
    
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    
    // Criar indicadores
    function createIndicators() {
        indicators.innerHTML = '';
        const totalPages = Math.ceil(cards.length / cardsPerView);
        for (let i = 0; i < totalPages; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(i));
            indicators.appendChild(indicator);
        }
    }
    
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 30;
        const offset = -(currentIndex * (cardWidth + gap));
        track.style.transform = `translateX(${offset}px)`;
        
        // Atualizar botões
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        
        // Atualizar indicadores
        const allIndicators = document.querySelectorAll('.indicator');
        allIndicators.forEach((ind, i) => {
            ind.classList.remove('active');
            if (i === Math.floor(currentIndex / cardsPerView)) {
                ind.classList.add('active');
            }
        });
    }
    
    function goToSlide(index) {
        currentIndex = index * cardsPerView;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        updateCarousel();
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Suporte para touch/swipe em mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        const diff = startX - currentX;
        
        if (diff > 50 && currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        } else if (diff < -50 && currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
        
        isDragging = false;
    });
    
    // Inicializar
    window.addEventListener('resize', updateCardsPerView);
    updateCardsPerView();
});