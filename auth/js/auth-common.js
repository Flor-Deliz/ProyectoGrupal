// auth-common.js - Funciones compartidas para autenticación

/**
 * Muestra un mensaje de error en el formulario
 * @param {HTMLElement} formElement - El formulario
 * @param {string} message - Mensaje de error
 */
function showAuthError(formElement, message) {
    // Limpia errores previos
    const oldError = formElement.querySelector('.auth-error');
    if (oldError) oldError.remove();
    
    // Crea y muestra el nuevo error
    const errorElement = document.createElement('div');
    errorElement.className = 'auth-error';
    errorElement.innerHTML = `
        <div class="alert alert-danger">
            <i class="fas fa-exclamation-circle"></i>
            ${message}
        </div>
    `;
    
    formElement.insertBefore(errorElement, formElement.firstChild);
}

/**
 * Valida si un email tiene formato válido
 * @param {string} email 
 * @returns {boolean}
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Valida si una contraseña cumple con los requisitos
 * @param {string} password 
 * @returns {boolean}
 */
function isValidPassword(password) {
    return password.length >= 8;
}