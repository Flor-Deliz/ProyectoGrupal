// services.js - Lógica relacionada con servicios

class PetService {
    constructor() {
        this.services = [];
        this.favorites = JSON.parse(localStorage.getItem('favoriteServices')) || [];
    }
    
    /**
     * Cargar servicios desde API o JSON local
     */
    async loadServices() {
        try {
            // En producción, reemplazar con fetch a API real
            const response = await fetch('data/services.json');
            this.services = await response.json();
            return this.services;
        } catch (error) {
            console.error('Error loading services:', error);
            return [];
        }
    }
    
    /**
     * Filtrar servicios por criterios
     */
    filterServices({ type = null, location = null, priceRange = null }) {
        return this.services.filter(service => {
            const typeMatch = !type || service.type === type;
            const locationMatch = !location || service.location.toLowerCase().includes(location.toLowerCase());
            const priceMatch = !priceRange || 
                (service.price >= priceRange[0] && service.price <= priceRange[1]);
            
            return typeMatch && locationMatch && priceMatch;
        });
    }
    
    /**
     * Agregar/remover de favoritos
     */
    toggleFavorite(serviceId) {
        const index = this.favorites.indexOf(serviceId);
        
        if (index === -1) {
            this.favorites.push(serviceId);
        } else {
            this.favorites.splice(index, 1);
        }
        
        localStorage.setItem('favoriteServices', JSON.stringify(this.favorites));
        return this.favorites;
    }
    
    /**
     * Obtener servicios favoritos
     */
    getFavoriteServices() {
        return this.services.filter(service => 
            this.favorites.includes(service.id)
        );
    }
}

// Instancia global del servicio
const petService = new PetService();

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', async function() {
    await petService.loadServices();
    
    // Ejemplo: Renderizar servicios en la página de listado
    if (document.getElementById('servicesList')) {
        renderServices(petService.services);
    }
    
    // Ejemplo: Renderizar favoritos
    if (document.getElementById('favoritesList')) {
        renderServices(petService.getFavoriteServices());
    }
});

function renderServices(services) {
    const container = document.getElementById('servicesList');
    if (!container) return;
    
    container.innerHTML = services.map(service => `
        <div class="service-card" data-id="${service.id}">
            <img src="${service.image}" alt="${service.name}">
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="service-meta">
                <span class="price">S/${service.price}</span>
                <button class="btn-favorite ${petService.favorites.includes(service.id) ? 'active' : ''}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Agregar event listeners a los botones de favorito
    document.querySelectorAll('.btn-favorite').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceId = this.closest('.service-card').dataset.id;
            petService.toggleFavorite(serviceId);
            this.classList.toggle('active');
        });
    });
}