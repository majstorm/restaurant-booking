const Booking = require('../models/Booking');

let getBookings = Booking.find()
    .catch({ msg: 'No items found' });

module.exports = getBookings