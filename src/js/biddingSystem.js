export class BiddingSystem {
    constructor() {
        this.bids = [];
        this.activeBiddings = new Map();
    }

    async initiateBidding(booking) {
        const bidding = {
            bookingId: booking.id,
            bids: this.generateInitialBids(),
            status: 'active',
            startTime: new Date(),
            endTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours bidding window
        };

        this.activeBiddings.set(booking.id, bidding);
        return bidding;
    }

    generateInitialBids() {
        // Simulate initial bids from different transporters
        return [
            {
                id: 1,
                transporterName: 'Express Logistics',
                price: 15000,
                vehicleType: '20ft Container Truck',
                rating: 4.5
            },
            {
                id: 2,
                transporterName: 'Swift Carriers',
                price: 14500,
                vehicleType: '20ft Open Truck',
                rating: 4.2
            },
            {
                id: 3,
                transporterName: 'Prime Transport',
                price: 16000,
                vehicleType: '20ft Refrigerated Truck',
                rating: 4.8
            }
        ];
    }

    async placeBid(bookingId, bid) {
        const bidding = this.activeBiddings.get(bookingId);
        if (!bidding) {
            throw new Error('Bidding not found');
        }

        if (bidding.status !== 'active') {
            throw new Error('Bidding is closed');
        }

        bidding.bids.push({
            id: Date.now(),
            ...bid,
            timestamp: new Date()
        });

        return bidding;
    }

    async acceptBid(bidId) {
        for (const [bookingId, bidding] of this.activeBiddings) {
            const bid = bidding.bids.find(b => b.id === bidId);
            if (bid) {
                bidding.status = 'completed';
                bidding.acceptedBid = bid;
                return { bookingId, bid };
            }
        }
        throw new Error('Bid not found');
    }
}