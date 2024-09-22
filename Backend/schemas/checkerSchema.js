const mongo = require("mongoose");

const purchaseSchema = new mongo.Schema({
    productName: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        default: 1
    }
})

module.exports = { purchaseSchema };