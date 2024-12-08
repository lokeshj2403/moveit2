export class BookingManager {
    constructor() {
        this.bookings = [];
    }

    async createBooking(bookingData) {
        // Validate booking data
        this.validateBookingData(bookingData);

        const booking = {
            id: Date.now(),
            ...bookingData,
            status: 'pending',
            createdAt: new Date(),
        };

        this.bookings.push(booking);
        return booking;
    }

    validateBookingData(data) {
        const requiredFields = [
            'pickupLocation',
            'deliveryLocation',
            'pickupDate',
            'cargoType'
        ];

        for (const field of requiredFields) {
            if (!data[field]) {
                throw new Error(`${field} is required`);
            }
        }

        // Validate pickup date is not in the past
        const pickupDate = new Date(data.pickupDate);
        if (pickupDate < new Date()) {
            throw new Error('Pickup date cannot be in the past');
        }
    }

    getBooking(bookingId) {
        return this.bookings.find(booking => booking.id === bookingId);
    }

    updateBookingStatus(bookingId, status) {
        const booking = this.getBooking(bookingId);
        if (!booking) {
            throw new Error('Booking not found');
        }
        booking.status = status;
        return booking;
    }
}