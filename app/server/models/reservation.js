const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    DateTime: {
        type: Date,
        required: true
    },
    TableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    /*
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    */
    ReservationName: {
        type: String,
        required: true
    },
    GuestNumber: {
        type: Number,
        required: true
    },
},{timestamps:true})

module.exports = Reservation = mongoose.model('reservation', ReservationSchema);