const Router = require('@koa/router')
const getBookings = require('../services/list-bookings')
const KoaBody = require('koa-body');
const reservation_controller = require('../controllers/reservation')
const restaurant_controller = require('../controllers/restaurant')
const table_controller = require('../controllers/table')
var router = new Router()

router.get('getRestaurants', '/restaurant', restaurant_controller.get_restaurants);

router.post('addRestaurant', '/restaurant',KoaBody(), restaurant_controller.create_restaurant);

router.get('getTables', '/restaurant/:name/tables', table_controller.get_tables);

router.post('addTable', '/restaurant/:name/add-table',KoaBody(), table_controller.add_table);

router.get('getReservations', '/restaurant/:name', reservation_controller.reservation_list);

router.post('reserveTable', '/restaurant/:name/reserve-table',KoaBody(), reservation_controller.reserve_table);

router.put('editReservation', '/restaurant/:name/reserve-table',KoaBody(), reservation_controller.update_reservation);

router.post('cancelTable', '/restaurant/:name/cancel-reservation',KoaBody(), reservation_controller.cancel_reservation);

router.put('changeWorkingHours', '/restaurant/:name/working-hours',KoaBody(), restaurant_controller.update_working_hours);

module.exports = router