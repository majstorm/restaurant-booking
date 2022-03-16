const Booking = require('../models/reservation');

let getBookings = Booking.find()
    .catch({ msg: 'No items found' });

module.exports = getBookings