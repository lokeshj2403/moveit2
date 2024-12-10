export class ImageCarousel {
    constructor() {
        this.currentImageIndex = 0;
        this.images = [
            {
                url: '/src/assets/truck1.jpg',
                alt: 'Modern delivery truck on highway'
            },
            {
                url: '/src/assets/truck2.jpg',
                alt: 'Large cargo truck for moving'
            },
            {
                url: '/src/assets/truck3.jpg',
                alt: 'Professional moving service truck'
            }
        ];
        
        this.initializeCarousel();
    }

    initializeCarousel() {
        setInterval(() => {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
            this.updateImage();
        }, 5000);
    }

    updateImage() {
        const heroImage = document.getElementById('hero-image');
        if (heroImage) {
            const { url, alt } = this.images[this.currentImageIndex];
            heroImage.src = url;
            heroImage.alt = alt;
        }
    }
}