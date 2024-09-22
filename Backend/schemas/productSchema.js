const mongo = require('mongoose');

const productSchema = new mongo.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    category: {
        /*
        1-Beverages
        2-Appetizers
        3-fastfood
        4-NorthIndian
        5-SouthIndian
        6-Chinese
        7-Continental
        8-Dessert
        */
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5, 6, 7, 8]
    },

    veg: {
        type: Boolean,
        required: true
    },

    isAvailable: {
        type: Boolean,
        required: true
    },

    imgLink: {
        type: String,
        required: true
    },

    count: {
        type: Number,
        default: 0,
        max:5
    }
})

module.exports = { productSchema };