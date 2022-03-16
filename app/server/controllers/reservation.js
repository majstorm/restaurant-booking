const Reservations = require('../models/reservation');
const Restaurant = require('../models/restaurant');
const Table = require('../models/table');

module.exports.reservation_list = async (ctx) => {
    try{
        let reservations = await Reservations.find()
        ctx.response.body = reservations;
        ctx.response.status = 200;
    }
    catch(err){
        console.error(err);
        ctx.response.status = 400;
        ctx.response.body = {"msg":"Error: Error querying reservations"};
    }
}

module.exports.update_reservation = async (ctx) => {
    try{
        let restaurant = await Restaurant.findOne({Name:ctx.params["name"]})
        if (ctx.request.body["Hour"] < restaurant.OpenHour || ctx.request.body["Hour"] >= restaurant.CloseHour){
            ctx.response.status = 400;
            return ctx.response.body = {"msg":`Error: Restaurant is closed at given hours - Working Hours ${restaurant.OpenHour}:00-${restaurant.CloseHour}:00`};
        }
        const current = {_id:ctx.request.body["_id"]}
        let reservation_date = new Date(ctx.request.body["Date"]+"T"+ctx.request.body["Hour"]+":00:00")
        for await (let table of Table.find({RestaurantId: restaurant._id})){
            if (ctx.request.body["GuestNumber"]<=table.NumberOfPlaces){
                let availability = await Reservations.findOne({DateTime:reservation_date, TableId:table._id}).select("_id").lean();
                if (!availability || availability._id==ctx.request.body["_id"]){
                    let update=
                        {
                            _id:ctx.request.body["_id"],
                            DateTime:reservation_date,
                            TableId:table._id,
                            ReservationName:ctx.request.body["ReservationName"],
                            GuestNumber:ctx.request.body["GuestNumber"]
                        };
                    let reservation = await Reservations.findOneAndUpdate(current, update);
                    console.log("Reservation at " + reservation.DateTime + " successfully updated for " + reservation.ReservationName);
                    ctx.response.body = {"msg":"Reservation updated"};
                    return ctx.response.status = 201;
                }
            }
        };
    }catch(err){
        console.error(err);
        ctx.response.status = 400;
        ctx.response.body = {"msg":"Error: Reservation not added"};
    }
}

module.exports.cancel_reservation = async (ctx) => {
    try{
        let restaurant = await Restaurant.findOne({Name:ctx.params["name"]})
        let reservation_date = new Date(ctx.request.body["Date"]+"T"+ctx.request.body["Hour"]+":00:00")
        let reservations = await Reservations.deleteOne({
            DateTime:reservation_date,
            ReservationName:ctx.request.body["ReservationName"],
            GuestNumber:ctx.request.body["GuestNumber"]
        })
        if (reservations.deletedCount==0){
            ctx.response.status = 400;
            return ctx.response.body = {"msg":"Error: No reservations to remove"};
        }else{
            ctx.response.body = {"msg":"Reservation cancelled"};;
            return ctx.response.status = 200;
        }
    }
    catch(err){
        console.error(err);
        ctx.response.status = 400;
        ctx.response.body = {"msg":"Error: Reservation not removed"};
    }
}

module.exports.reserve_table = async (ctx) => {
    try{
        let restaurant = await Restaurant.findOne({Name:ctx.params["name"]})
        if (ctx.request.body["Hour"] < restaurant.OpenHour || ctx.request.body["Hour"] >= restaurant.CloseHour){
            ctx.response.status = 400;
            return ctx.response.body = {"msg":`Error: Restaurant is closed at given hours - Working Hours ${restaurant.OpenHour}:00-${restaurant.CloseHour}:00`};
        }
        let reservation_date = new Date(ctx.request.body["Date"]+"T"+ctx.request.body["Hour"]+":00:00")
        for await (let table of Table.find({RestaurantId: restaurant._id})){
            if (ctx.request.body["GuestNumber"]<=table.NumberOfPlaces){
                let availability = await Reservations.findOne({DateTime:reservation_date, TableId:table._id}).select("_id").lean();
                if (!availability){
                    let reservation = new Reservations(
                        {
                            DateTime:reservation_date,
                            TableId:table._id,
                            ReservationName:ctx.request.body["ReservationName"],
                            GuestNumber:ctx.request.body["GuestNumber"]
                        }
                    );
                    await reservation.save()
                    console.log("Reservation at " + reservation.DateTime + " successfully created for " + reservation.ReservationName);
                    ctx.response.body = {"msg":"Reservation created"};
                    return ctx.response.status = 201;
                }
            }
        };
        ctx.response.body = {"msg":"No available tables"};
        return ctx.response.status = 201;
    }catch(err){
        console.error(err);
        ctx.response.status = 400;
        ctx.response.body = {"msg":"Error: Reservation not added"};
    }
}