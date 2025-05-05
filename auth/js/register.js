// register.js - Lógica específica para registro

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const userTypeBtns = document.querySelectorAll('.user-type-btn');
    const userTypeInput = document.getElementById('userType');
    
    // Manejar selección de tipo de usuario
    userTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            userTypeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            userTypeInput.value = this.dataset.type;
        });
    });
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userType = userTypeInput.value;
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirm').value;
            const termsAgreed = document.getElementById('termsAgreement').checked;
            
            // Validaciones
            if (!name || !email || !password || !confirmPassword) {
                showAuthError(registerForm, 'Por favor completa todos los campos');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAuthError(registerForm, 'Por favor ingresa un email válido');
                return;
            }
            
            if (!isValidPassword(password)) {
                showAuthError(registerForm, 'La contraseña debe tener al menos 8 caracteres');
                return;
            }
            
            if (password !== confirmPassword) {
                showAuthError(registerForm, 'Las contraseñas no coinciden');
                return;
            }
            
            if (!termsAgreed) {
                showAuthError(registerForm, 'Debes aceptar los términos y condiciones');
                return;
            }
            
            // Simulación de registro exitoso
            console.log('Registrando usuario:', { userType, name, email, password });
            
            // Mostrar loading
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creando cuenta...';
            submitBtn.disabled = true;
            
            // Simular petición AJAX
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Redirigir según tipo de usuario
                if (userType === 'caretaker') {
                    window.location.href = '../profiles/caretaker/profile-edit.html';
                } else {
                    window.location.href = '../profiles/user/dashboard.html';
                }
            }, 2000);
        });
    }
});