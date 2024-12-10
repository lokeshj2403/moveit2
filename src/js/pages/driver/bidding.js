import { BiddingSystem } from '../../biddingSystem.js';
import { BookingManager } from '../../bookingManager.js';

const biddingSystem = new BiddingSystem();
const bookingManager = new BookingManager();

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadAvailableBookings();
});

async function loadAvailableBookings() {
    const bookingsContainer = document.getElementById('availableBookings');
    const bookings = bookingManager.bookings.filter(booking => booking.status === 'pending');
    
    bookingsContainer.innerHTML = bookings.map(booking => `
        <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">Booking #${booking.id}</h2>
                <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Awaiting Bids
                </span>
            </div>
            <div class="space-y-2 mb-4">
                <p><strong>Pickup:</strong> ${booking.pickupLocation}</p>
                <p><strong>Delivery:</strong> ${booking.deliveryLocation}</p>
                <p><strong>Date:</strong> ${new Date(booking.pickupDate).toLocaleDateString()}</p>
                <p><strong>Cargo:</strong> ${booking.cargoType}</p>
            </div>
            <button onclick="showBidModal(${booking.id})" 
                    class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                Place Bid
            </button>
        </div>
    `).join('');
}

// Make modal functions globally available
window.showBidModal = (bookingId) => {
    const modal = document.getElementById('bidModal');
    document.getElementById('bookingId').value = bookingId;
    modal.classList.remove('hidden');
};

window.hideBidModal = () => {
    const modal = document.getElementById('bidModal');
    modal.classList.add('hidden');
};

// Handle bid submission
document.getElementById('bidForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const bid = {
            bookingId: parseInt(formData.get('bookingId')),
            price: parseFloat(formData.get('bidAmount')),
            vehicleType: formData.get('vehicleType'),
            notes: formData.get('notes'),
            transporterName: 'Your Company Name', // This would come from the logged-in user's profile
            rating: 4.5 // This would come from the driver's actual rating
        };

        await biddingSystem.placeBid(bid.bookingId, bid);
        hideBidModal();
        alert('Bid placed successfully!');
        loadAvailableBookings(); // Refresh the list
        
    } catch (error) {
        alert(error.message);
    }
});