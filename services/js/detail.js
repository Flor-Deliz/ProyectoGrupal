// services/js/detail.js - Lógica para detalle de servicio

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Swiper (galería de imágenes)
    const swiper = new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    
    // Cargar datos del servicio
    loadServiceData();
    
    // Event listeners
    document.getElementById('book-now').addEventListener('click', bookService);
    document.getElementById('load-more-reviews').addEventListener('click', loadMoreReviews);
    
    // Funciones
    async function loadServiceData() {
        try {
            // Obtener ID del servicio de la URL
            const urlParams = new URLSearchParams(window.location.search);
            const serviceId = urlParams.get('id') || '1';
            
            // Simular carga desde API
            const response = await fetch(`../assets/data/service-${serviceId}.json`);
            const serviceData = await response.json();
            
            // Actualizar la UI con los datos
            renderServiceData(serviceData);
        } catch (error) {
            console.error('Error al cargar datos del servicio:', error);
            showToast('No se pudieron cargar los datos del servicio', 'error');
        }
    }
    
    function renderServiceData(data) {
        // Actualizar galería de imágenes
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = data.images.map(img => `
            <div class="swiper-slide">
                <img src="../assets/images/services/${img}" alt="${data.name}">
            </div>
        `).join('');
        
        // Actualizar datos principales
        document.title = `${data.name} | PetCare`;
        document.querySelector('.service-header h1').textContent = data.name;
        document.querySelector('.rating span').textContent = data.rating;
        document.querySelector('.rating-count').textContent = `(${data.reviews.length} reseñas)`;
        document.querySelector('.location span').textContent = data.location;
        
        // Actualizar descripción
        const descriptionEl = document.querySelector('.service-description');
        descriptionEl.querySelector('p').textContent = data.description;
        
        const featuresList = descriptionEl.querySelector('ul');
        featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
        
        // Actualizar características
        const featuresContainer = document.querySelector('.features-grid');
        featuresContainer.innerHTML = data.metaFeatures.map(f => `
            <div class="feature">
                <i class="fas fa-${f.icon}"></i>
                <span>${f.text}</span>
            </div>
        `).join('');
        
        // Actualizar precio
        document.querySelector('.price .amount').textContent = `S/${data.price}`;
        document.querySelector('.price .unit').textContent = data.priceUnit;
        
        // Actualizar reseñas
        renderReviews(data.reviews.slice(0, 3));
    }
    
    function renderReviews(reviews) {
        const reviewsContainer = document.querySelector('.reviews-list');
        
        if (reviews.length === 0) {
            reviewsContainer.innerHTML = `
                <div class="no-reviews">
                    <i class="fas fa-comment-slash"></i>
                    <p>Este servicio aún no tiene reseñas</p>
                </div>
            `;
            return;
        }
        
        reviewsContainer.innerHTML = reviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <img src="../assets/images/users/${review.avatar}" alt="${review.user}" class="reviewer-avatar">
                    <div class="reviewer-info">
                        <h4>${review.user}</h4>
                        <div class="review-meta">
                            <div class="rating">
                                ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                                ${'<i class="far fa-star"></i>'.repeat(5 - review.rating)}
                            </div>
                            <span class="date">${review.date}</span>
                        </div>
                    </div>
                </div>
                <div class="review-content">
                    <p>${review.comment}</p>
                </div>
            </div>
        `).join('');
    }
    
    function loadMoreReviews() {
        // En una implementación real, haríamos una petición para cargar más reseñas
        showToast('Cargando más reseñas...', 'info');
    }
    
    function bookService() {
        const date = document.getElementById('booking-date').value;
        const time = document.getElementById('booking-time').value;
        const pet = document.getElementById('booking-pets').value;
        
        if (!date || !time || !pet) {
            showToast('Por favor completa todos los campos', 'error');
            return;
        }
        
        // Simular reserva exitosa
        showToast('¡Reserva realizada con éxito!', 'success');
        
        // Redirigir a confirmación (en implementación real)
        setTimeout(() => {
            window.location.href = '../profiles/user/booking-confirmation.html';
        }, 2000);
    }
});