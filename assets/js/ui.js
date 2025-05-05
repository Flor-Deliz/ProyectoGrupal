// ui.js - Componentes de interfaz de usuario

/**
 * Muestra un toast/notificación
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo (success, error, warning, info)
 * @param {number} duration - Duración en milisegundos (opcional)
 */
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    const toast = document.createElement('div');
    
    toast.className = `toast toast-${type} fade-in`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${getToastIcon(type)}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remover después de la duración
    const timeout = setTimeout(() => {
        toast.remove();
    }, duration);
    
    // Permitir cerrar manualmente
    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(timeout);
        toast.remove();
    });
}

function getToastIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || 'fa-info-circle';
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

/**
 * Muestra un modal de diálogo
 * @param {object} options - Opciones del modal
 */
function showModal(options) {
    const modalId = 'customModal-' + Date.now();
    const modalHtml = `
        <div id="${modalId}" class="modal fade-in">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                ${options.title ? `<div class="modal-header"><h3>${options.title}</h3></div>` : ''}
                <div class="modal-body">${options.content}</div>
                <div class="modal-footer">
                    ${options.cancelText ? `<button class="btn btn-secondary modal-cancel">${options.cancelText}</button>` : ''}
                    <button class="btn btn-primary modal-confirm">${options.confirmText || 'Aceptar'}</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById(modalId);
    
    // Manejar clic en confirmar
    modal.querySelector('.modal-confirm').addEventListener('click', function() {
        if (typeof options.onConfirm === 'function') {
            options.onConfirm();
        }
        modal.remove();
    });
    
    // Manejar clic en cancelar
    const cancelBtn = modal.querySelector('.modal-cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (typeof options.onCancel === 'function') {
                options.onCancel();
            }
            modal.remove();
        });
    }
    
    // Cerrar al hacer clic fuera
    modal.querySelector('.modal-overlay').addEventListener('click', function() {
        modal.remove();
    });
}