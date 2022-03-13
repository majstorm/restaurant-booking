const mongoose = require('mongoose')

/**
* Booking Schema
*/
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
    CreatedAt: {
        type: Date,
        required: true
    },
})

export default BookingSchema