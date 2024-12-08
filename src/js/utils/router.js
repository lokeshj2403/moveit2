export class Router {
    constructor() {
        this.routes = new Map();
        this.initializeRoutes();
        window.addEventListener('popstate', this.handleRoute.bind(this));
    }

    initializeRoutes() {
        this.routes.set('/', () => this.loadHomePage());
        this.routes.set('/customer', () => this.loadCustomerInterface());
        this.routes.set('/driver', () => this.loadDriverInterface());
        this.routes.set('/booking', () => this.loadBookingInterface());
    }

    async loadHomePage() {
        try {
            const response = await fetch('/index.html');
            const content = await response.text();
            document.documentElement.innerHTML = content;
            // Reinitialize scripts
            const script = document.createElement('script');
            script.type = 'module';
            script.src = '/src/js/main.js';
            document.body.appendChild(script);
        } catch (error) {
            console.error('Error loading home page:', error);
        }
    }

    async loadCustomerInterface() {
        try {
            const response = await fetch('/src/pages/customer/customer.html');
            const content = await response.text();
            document.querySelector('main').innerHTML = content;
        } catch (error) {
            console.error('Error loading customer interface:', error);
        }
    }

    async loadDriverInterface() {
        try {
            const response = await fetch('/src/pages/driver/driver.html');
            const content = await response.text();
            document.querySelector('main').innerHTML = content;
        } catch (error) {
            console.error('Error loading driver interface:', error);
        }
    }

    async loadBookingInterface() {
        try {
            const response = await fetch('/src/pages/customer/booking.html');
            const content = await response.text();
            document.querySelector('main').innerHTML = content;
            
            // Load the booking page scripts
            const script = document.createElement('script');
            script.type = 'module';
            script.src = '/src/js/pages/customer/booking.js';
            document.body.appendChild(script);
        } catch (error) {
            console.error('Error loading booking interface:', error);
        }
    }

    handleRoute() {
        const path = window.location.pathname;
        const handler = this.routes.get(path);
        if (handler) {
            handler();
        }
    }

    navigateTo(path) {
        window.history.pushState({}, '', path);
        const handler = this.routes.get(path);
        if (handler) {
            handler();
        }
    }
}