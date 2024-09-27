const Razorpay = require("razorpay");
const express = require("express");
const router = express.Router();

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET",
});

router.post("/create-order", async (req, res) => {
  const options = {
    amount: req.body.amount, // amount in paise
    currency: "INR",
    receipt: "receipt#1",
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
//still logic is remaining in above code for proper-integration of payment-gateway