// login.js - Lógica específica para login

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Validaciones básicas
            if (!email || !password) {
                showAuthError(loginForm, 'Por favor completa todos los campos');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAuthError(loginForm, 'Por favor ingresa un email válido');
                return;
            }
            
            // Simulación de login exitoso
            console.log('Intentando login con:', { email, password });
            
            // Mostrar loading
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
            submitBtn.disabled = true;
            
            // Simular petición AJAX
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Redirigir al dashboard después de login exitoso
                window.location.href = '../profiles/user/dashboard.html';
            }, 1500);
        });
    }
});