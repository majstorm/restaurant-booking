const Booking = require('../models/Booking');

module.exports.reservation_list = (ctx) => {
    let reservations = Booking.find()
    .catch({ msg: 'No items found' });
    ctx.request.body = reservations
    ctx.response.status = 200;
}

module.exports.reserve_table = (ctx) => {
    let reserve = ctx.request.body;
    ctx.body = {"msg":"Thanks"};
    ctx.response.status = 201;
}