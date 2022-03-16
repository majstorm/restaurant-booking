const Table = require('../models/table');
const Restaurant = require('../models/restaurant');

module.exports.get_tables = async (ctx) => {
    try{
        let tables = await Table.find()
        ctx.response.body = tables
        ctx.response.status = 200;
    }
    catch(err){
        console.error(err);
        ctx.response.status = 400;
        ctx.response.body = {"msg":"Error: Error querying tables"};
    }
}

module.exports.add_table = async (ctx) => {
    try{
        let restaurant = await Restaurant.findOne({Name:ctx.params["name"]})
        let table = new Table(Object.assign(ctx.request.body,{RestaurantId: restaurant._id}));
        await table.save()
        console.log("Table number " + table.Id + " successfully created");
        ctx.response.body = {"msg":"Table created"};
        ctx.response.status = 201;
    }catch(err){
        console.error(err);
        ctx.response.status = 400;
        ctx.response.body = {"msg":"Error: Table not created"};
    }
    
}