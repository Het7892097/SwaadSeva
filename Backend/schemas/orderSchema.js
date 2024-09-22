const mongo = require('mongoose');
const { User } = require("../DB");
const { array, number, boolean } = require('zod');

const orderSchema = new mongo.Schema({
    orderDate: {
        type: Date,
        required: true,
    },
    orders: {
        type:[ {
            userId: {
                type: mongo.Schema.Types.ObjectId,
                ref:"User",
                required: true
            },
            orderId:{
                type:String,
                required:true
            },
            orderedTime: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            isCompleted: {
                type: Boolean,
                default: false,
            }
        } ],
    default:[]
}
});

module.exports = { orderSchema };