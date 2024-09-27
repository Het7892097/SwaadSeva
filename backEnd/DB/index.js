const mongo = require("mongoose");
const { userSchema } = require("../schemas/userSchema");
const { productSchema } = require("../schemas/productSchema");
const { orderSchema } = require("../schemas/orderSchema");

const { mongoConnectString } = require("../utils/KeySettings");

mongo
  .connect(mongoConnectString)
  .then(() => console.log("Successfully connected to DB"))
  .catch((e) =>
    console.error("Some error occurred while connecting to database", e)
  );

const User = mongo.model("Users", userSchema);
const Product = mongo.model("Products", productSchema);
const Order = mongo.model("Orders", orderSchema);

module.exports = {
  User,
  Product,
  Order,
};
