document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del usuario
    loadUserData();
    
    // Cargar vista previa de mascotas
    loadPetsPreview();
    
    // Cargar próximas reservas
    loadBookingsPreview();
    
    // Cargar estadísticas
    loadStats();
  });
  
  async function loadUserData() {
    try {
      // Simular llamada a API
      const userData = await fetchUserData();
      document.getElementById('userName').textContent = userData.name;
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  }
  
  async function loadPetsPreview() {
    const container = document.getElementById('petsPreview');
    
    try {
      const pets = await fetchPets();
      
      if (pets.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-paw"></i>
            <p>No tienes mascotas registradas</p>
          </div>
        `;
        return;
      }
      
      // Mostrar máximo 3 mascotas en el dashboard
      const petsToShow = pets.slice(0, 3);
      container.innerHTML = petsToShow.map(pet => `
        <div class="pet-card">
          <img src="${pet.photo || '../../assets/images/pets/default.jpg'}" alt="${pet.name}" class="pet-avatar">
          <div class="pet-name">${pet.name}</div>
        </div>
      `).join('');
      
    } catch (error) {
      console.error('Error al cargar mascotas:', error);
      container.innerHTML = `
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <p>No se pudieron cargar las mascotas</p>
        </div>
      `;
    }
  }
  
  // Funciones similares para loadBookingsPreview() y loadStats()