const mongoose = require('mongoose')

/**
* Table Schema
*/
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
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
})

let Table = mongoose.model('Table', TableSchema, 'Tables')

module.exports = Table