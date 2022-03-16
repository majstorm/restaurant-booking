const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    unique: true
  },
  Email: {
    type: String,
  },
  CompanyName: {
    type: String,
    required: true
  },
  OpenHour: {
    type: Number,
    required: true
  },
  CloseHour: {
    type: Number,
    required: true
  }
})

module.exports = Restaurant = mongoose.model('restaurant', restaurantSchema);