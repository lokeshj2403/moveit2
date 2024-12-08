import { BookingManager } from '../../bookingManager.js';
import { BiddingSystem } from '../../biddingSystem.js';
import { DocumentValidator } from '../../documentValidator.js';

const bookingManager = new BookingManager();
const biddingSystem = new BiddingSystem();
const documentValidator = new DocumentValidator();

document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const bookingData = {
            pickupLocation: formData.get('pickupLocation'),
            deliveryLocation: formData.get('deliveryLocation'),
            pickupDate: formData.get('pickupDate'),
            cargoType: formData.get('cargoType'),
            notes: formData.get('notes'),
        };

        // Validate and create booking
        const booking = await bookingManager.createBooking(bookingData);
        
        // Validate documents
        const cargoImages = formData.getAll('cargoImages');
        await documentValidator.validateDocuments(...cargoImages);

        // Initiate bidding
        const bidding = await biddingSystem.initiateBidding(booking);
        
        // Show bids section and render initial bids
        showBidsSection(bidding);
        
    } catch (error) {
        alert(error.message);
    }
});

function showBidsSection(bidding) {
    const bidsSection = document.getElementById('bidsSection');
    const bidsList = document.getElementById('bidsList');
    
    bidsSection.classList.remove('hidden');
    
    // Render bids
    bidsList.innerHTML = bidding.bids.map(bid => `
        <div class="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-center mb-2">
                <h3 class="font-bold">${bid.transporterName}</h3>
                <span class="text-xl font-bold">₹${bid.price}</span>
            </div>
            <div class="text-sm text-gray-600">
                <p>Vehicle: ${bid.vehicleType}</p>
                <p>Rating: ${bid.rating} ⭐</p>
            </div>
            <button onclick="acceptBid(${bid.id})" 
                    class="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors">
                Accept Bid
            </button>
        </div>
    `).join('');
}

// Make acceptBid function globally available
window.acceptBid = async (bidId) => {
    try {
        const result = await biddingSystem.acceptBid(bidId);
        alert(`Bid accepted! Your booking has been confirmed.`);
        // Redirect to booking confirmation page or show confirmation modal
    } catch (error) {
        alert(error.message);
    }
};