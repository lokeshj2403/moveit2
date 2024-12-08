export class ModalManager {
    constructor() {
        this.modals = new Map();
        this.initializeModals();
    }

    initializeModals() {
        this.modals.set('login', document.getElementById('loginModal'));
        this.modals.set('register', document.getElementById('registerModal'));
    }

    showModal(modalId) {
        const modal = this.modals.get(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideModal(modalId) {
        const modal = this.modals.get(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    hideAllModals() {
        this.modals.forEach(modal => {
            modal.classList.add('hidden');
        });
    }
}