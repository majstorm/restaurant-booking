const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    DateTime: {
        type: Date,
        required: true
    },
    TableId: {
        type: String,
        required: true
    },
    CustomerId: {
        type: String,
        required: true
    },
    GuestNumber: {
        type: Number,
        required: true
    },
    CreatedAt: {
        type: Date,
        required: true
    },
})

module.exports = Booking = mongoose.model('booking', BookingSchema);