const mongoose = require('mongoose')

const TableSchema = new mongoose.Schema({
    Id: {
        type: Number,
        required: true,
        unique: true,
    },
    NumberOfPlaces: {
        type: Number,
        required: true
    },
    Type: {
        type: String,
        default: "Standard",
        required: true
    },
    Description: {
        type: String,
    },
    RestaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
},{timestamps:true})

module.exports = Table = mongoose.model('table', TableSchema);