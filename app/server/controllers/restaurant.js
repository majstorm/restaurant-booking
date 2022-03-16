const Restaurant = require('../models/restaurant');

module.exports.get_restaurants = async (ctx) => {
    try{
        let restaurants = await Restaurant.find({})
        ctx.response.body = restaurants
        ctx.response.status = 200;
    }
    catch(err){
        console.error(err);
        ctx.response.status = 400;
        ctx.response.body = {"msg":"Error: Error querying restaurants"};
    }
}

module.exports.create_restaurant = async (ctx) => {
    try{
        let restaurant = new Restaurant(ctx.request.body);
        await restaurant.save()
        ctx.body = {"msg":"Restaurant saved"};
        ctx.response.status = 201;
    }
    catch(err){
        console.error(err);
        ctx.response.status = 400;
        ctx.response.body = {"msg":"Error: Error creating restaurant"};
    }
}

module.exports.update_working_hours = async (ctx) => {
    try{
        let restaurant_name = ctx.request.params["name"]
        let restaurant = await Restaurant.findOneAndUpdate({Name: restaurant_name}, {OpenHour:ctx.request.body["OpenHour"],CloseHour:ctx.request.body["CloseHour"]}, {
            new: true
        });
        ctx.response.body = restaurant;
        ctx.response.status = 200;
    }
    catch{
        console.error(err);
        ctx.response.status = 400;
        ctx.response.body = {"msg":"Error: Couldnt update working hours"};
    }
}