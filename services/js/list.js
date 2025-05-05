// services/js/list.js - Lógica para listado de servicios

document.addEventListener('DOMContentLoaded', function() {
    // Variables de estado
    let currentPage = 1;
    const servicesPerPage = 6;
    let allServices = [];
    let filteredServices = [];
    
    // Elementos del DOM
    const servicesContainer = document.getElementById('services-container');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const sortButtons = document.querySelectorAll('.sort-btn');
    
    // Cargar servicios
    loadServices();
    
    // Event listeners
    applyFiltersBtn.addEventListener('click', applyFilters);
    prevPageBtn.addEventListener('click', goToPrevPage);
    nextPageBtn.addEventListener('click', goToNextPage);
    
    sortButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sortButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            sortServices(this.dataset.sort);
        });
    });
    
    // Funciones
    async function loadServices() {
        try {
            // Mostrar loading
            servicesContainer.innerHTML = `
                <div class="loading-spinner">
                    <i class="fas fa-paw fa-spin"></i>
                    <p>Cargando servicios...</p>
                </div>
            `;
            
            // Simular carga desde API
            const response = await fetch('../assets/data/services.json');
            allServices = await response.json();
            filteredServices = [...allServices];
            
            // Renderizar primera página
            renderServices();
        } catch (error) {
            console.error('Error al cargar servicios:', error);
            servicesContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>No se pudieron cargar los servicios. Por favor intenta nuevamente.</p>
                </div>
            `;
        }
    }
    
    function applyFilters() {
        const serviceType = document.getElementById('service-type').value;
        const location = document.getElementById('location').value;
        const priceRange = document.getElementById('price-range').value;
        
        filteredServices = allServices.filter(service => {
            // Filtrar por tipo de servicio
            const typeMatch = !serviceType || service.type === serviceType;
            
            // Filtrar por ubicación
            const locationMatch = !location || 
                service.location.toLowerCase().includes(location.toLowerCase());
            
            // Filtrar por rango de precio
            let priceMatch = true;
            if (priceRange) {
                const [min, max] = priceRange.split('-').map(Number);
                if (max) {
                    priceMatch = service.price >= min && service.price <= max;
                } else {
                    priceMatch = service.price >= min;
                }
            }
            
            return typeMatch && locationMatch && priceMatch;
        });
        
        // Resetear a primera página
        currentPage = 1;
        renderServices();
    }
    
    function sortServices(sortType) {
        filteredServices.sort((a, b) => {
            switch (sortType) {
                case 'rating':
                    return b.rating - a.rating;
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });
        
        renderServices();
    }
    
    function renderServices() {
        // Calcular servicios para la página actual
        const startIndex = (currentPage - 1) * servicesPerPage;
        const endIndex = startIndex + servicesPerPage;
        const servicesToShow = filteredServices.slice(startIndex, endIndex);
        
        // Renderizar servicios
        if (servicesToShow.length > 0) {
            servicesContainer.innerHTML = servicesToShow.map(service => `
                <div class="service-card" data-id="${service.id}">
                    <img src="../assets/images/services/${service.image}" alt="${service.name}">
                    <div class="service-card-content">
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        <div class="service-meta">
                            <span class="price">S/${service.price}</span>
                            <button class="btn-favorite">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            servicesContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No se encontraron servicios con los filtros aplicados</p>
                </div>
            `;
        }
        
        // Actualizar controles de paginación
        updatePaginationControls();
    }
    
    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
        
        // Actualizar información de página
        pageInfo.textContent = `Página ${currentPage} de ${totalPages || 1}`;
        
        // Habilitar/deshabilitar botones
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
    
    function goToPrevPage() {
        if (currentPage > 1) {
            currentPage--;
            renderServices();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    function goToNextPage() {
        const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderServices();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});