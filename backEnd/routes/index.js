const express=require("express");
const mainRouter=express.Router();
const userRouter =require("./userRouter");
const productRouter=require("./productRouter");
const paymentRouter=require('./paymentRouter');
//base route: api/v1/

// route: api/v1/user
mainRouter.use("/user",(req,res,next)=>{
    console.log("Through user route");
    next();
},userRouter);

// route: api/v1/product
mainRouter.use("/product",(req,res,next)=>{
    console.log("Through product route");
    next();
},productRouter);

// route: api/v1/payment
mainRouter.use("/payment",(req,res,next)=>{
    console.log("Through payment-route");
},paymentRouter)

module.exports=mainRouter;