const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const restaurantSchema = mongoose.Schema({
  Id:{
    type: Number,
    unique: true
  },
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  CompanyName: {
    type: String,
  },
})

restaurantSchema.plugin(passportLocalMongoose);

export default restaurantSchema