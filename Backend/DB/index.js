const mongo = require("mongoose");
const { userSchema } = require("../schemas/userSchema");
const { productSchema } = require("../schemas/productSchema");
const {orderSchema}=require("../schemas/orderSchema")

const dbUrl = "mongodb+srv://backup525125:BP5101520@machine-4.ac0b784.mongodb.net/foodOrderApp"

mongo.connect(dbUrl)
    .then(() => console.log("Successfully connected to DB"))
    .catch(e => console.log("Some error occurred while connecting to database"))

const User = mongo.model("Users", userSchema);
const Product = mongo.model("Products", productSchema);
const Order=mongo.model("Orders",orderSchema);


module.exports = {
    User, Product, Order
}