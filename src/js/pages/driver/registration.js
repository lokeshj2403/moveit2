import { DocumentValidator } from '../../documentValidator.js';

class DriverRegistration {
    constructor() {
        this.documentValidator = new DocumentValidator();
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const form = document.getElementById('driverRegistrationForm');
        if (form) {
            form.addEventListener('submit', this.handleRegistration.bind(this));
        }
    }

    async handleRegistration(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        try {
            // Validate documents
            await this.validateDocuments(formData);

            // Simulate API call to register driver
            await this.registerDriver(formData);

            // Show success modal
            this.showSuccessModal();
            
            // Reset form
            form.reset();

        } catch (error) {
            alert(error.message);
        }
    }

    async validateDocuments(formData) {
        const documents = [
            formData.get('driversLicense'),
            formData.get('vehicleRC'),
            formData.get('insurance')
        ];

        const vehiclePhotos = formData.getAll('vehiclePhotos');
        await this.documentValidator.validateDocuments(...documents, ...vehiclePhotos);
    }

    async registerDriver(formData) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: 'Driver registration submitted successfully'
                });
            }, 1500);
        });
    }

    showSuccessModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }
}

// Initialize driver registration
const driverRegistration = new DriverRegistration();

// Make modal functions globally available
window.hideSuccessModal = () => {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
    }
};