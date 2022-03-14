const Router = require('@koa/router')
const getBookings = require('../services/list-bookings')
const KoaBody = require('koa-body');
const reservation_controller = require('../controllers/reservation')
var router = new Router()

router.get('reservation_list', '/', reservation_controller.reservation_list);

router.post('addReservation', '/',KoaBody(), reservation_controller.reserve_table);

router.post('main', '/working-hours',KoaBody(), (ctx) => {
    ctx.body = {};
  });

module.exports = router