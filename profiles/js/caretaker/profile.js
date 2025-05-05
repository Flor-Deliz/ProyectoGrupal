document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del perfil
    loadProfileData();
    
    // Manejar subida de foto
    document.getElementById('profilePhoto').addEventListener('change', handlePhotoUpload);
    
    // Manejar certificaciones dinámicas
    document.getElementById('addCertification').addEventListener('click', addCertificationField);
    
    // Manejar envío del formulario
    document.getElementById('profileForm').addEventListener('submit', saveProfile);
  });
  
  async function loadProfileData() {
    try {
      const profileData = await fetchProfileData();
      
      // Llenar formulario con datos existentes
      document.getElementById('fullName').value = profileData.name || '';
      document.getElementById('tagline').value = profileData.tagline || '';
      document.getElementById('about').value = profileData.about || '';
      document.getElementById('phone').value = profileData.phone || '';
      document.getElementById('location').value = profileData.location || '';
      
      if (profileData.photo) {
        document.getElementById('profilePhotoPreview').src = profileData.photo;
      }
      
      // Llenar certificaciones
      const certsContainer = document.getElementById('certificationsContainer');
      certsContainer.innerHTML = '';
      
      if (profileData.certifications && profileData.certifications.length > 0) {
        profileData.certifications.forEach(cert => {
          addCertificationField(cert);
        });
      }
      
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      showToast('No se pudo cargar el perfil', 'error');
    }
  }
  
  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById('profilePhotoPreview').src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
  
  function addCertificationField(data = {}) {
    const certsContainer = document.getElementById('certificationsContainer');
    const certId = Date.now();
    
    const certHtml = `
      <div class="certification-item" data-id="${certId}">
        <div class="certification-content">
          <div class="form-group">
            <input type="text" placeholder="Nombre de la certificación" 
                   value="${data.name || ''}" required>
          </div>
          <div class="form-group">
            <input type="text" placeholder="Institución" 
                   value="${data.institution || ''}">
          </div>
          <div class="form-group">
            <input type="number" placeholder="Año" 
                   value="${data.year || ''}" min="1900" max="2100">
          </div>
        </div>
        <button type="button" class="remove-certification">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    
    certsContainer.insertAdjacentHTML('beforeend', certHtml);
    
    // Agregar event listener al botón de eliminar
    const newCert = certsContainer.querySelector(`[data-id="${certId}"]`);
    newCert.querySelector('.remove-certification').addEventListener('click', function() {
      newCert.remove();
    });
  }
  
  async function saveProfile(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    try {
      // Mostrar loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
      
      // Recopilar datos del formulario
      const formData = new FormData();
      formData.append('name', document.getElementById('fullName').value);
      formData.append('tagline', document.getElementById('tagline').value);
      formData.append('about', document.getElementById('about').value);
      formData.append('phone', document.getElementById('phone').value);
      formData.append('location', document.getElementById('location').value);
      
      // Agregar foto si se seleccionó una
      const photoInput = document.getElementById('profilePhoto');
      if (photoInput.files[0]) {
        formData.append('photo', photoInput.files[0]);
      }
      
      // Recopilar certificaciones
      const certifications = [];
      document.querySelectorAll('.certification-item').forEach(item => {
        const inputs = item.querySelectorAll('input');
        certifications.push({
          name: inputs[0].value,
          institution: inputs[1].value,
          year: inputs[2].value
        });
      });
      formData.append('certifications', JSON.stringify(certifications));
      
      // Simular envío a API
      await updateProfile(formData);
      
      showToast('Perfil actualizado correctamente', 'success');
      
    } catch (error) {
      console.error('Error al guardar perfil:', error);
      showToast('Error al guardar el perfil', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }