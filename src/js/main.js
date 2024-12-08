import { ModalManager } from './utils/modalManager.js';
import { Router } from './utils/router.js';
import { ImageCarousel } from './utils/imageCarousel.js';

const modalManager = new ModalManager();
const router = new Router();
const imageCarousel = new ImageCarousel();

// Make router globally available
window.router = router;

// Modal handlers
window.showLoginModal = () => modalManager.showModal('login');
window.hideLoginModal = () => modalManager.hideModal('login');
window.showRegisterModal = () => modalManager.showModal('register');
window.hideRegisterModal = () => modalManager.hideModal('register');

// Form handlers
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Handle login form submission
});

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Handle register form submission
});