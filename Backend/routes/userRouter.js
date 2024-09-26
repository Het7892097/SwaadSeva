//Separated DB logic from controller so as in future if there's requirement to change the DB used i.e MSSQL/ firebase then we don't need change controller,just have to create repo logic
//matching controller logic

const express=require("express");
const router=express.Router();
const {userCreator,userLogger,userRemover,userUpdater,productOrder, userDetailer, orderGetter}=require("../controllers/userController");
const {userMiddleware}=require("../middlewares/userMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

//base route: api/v1/user

//route: api/v1/user/signup
router.post("/signup/:adminKey",(req,res,next)=>{
    console.log("through User-signup route");
    next();
},userCreator); //admin key for admin-user creation

//route: api/v1/user/signin
router.post("/signin",(req,res,next)=>{
    console.log("through User-signin route");
    next();
},userLogger); 

//route: api/v1/user/detailer
router.post("/detailer",(req,res,next)=>{
    console.log("through User-detailer route");
    next(); 
},userDetailer); 


//route: api/v1/user/update
router.patch("/update",(req,res,next)=>{
    console.log("through User-update route");
    next();
},userMiddleware,userUpdater);

//route: api/v1/user/order
router.post("/order",(req,res,next)=>{
    console.log("through User-order route");
    next();
},userMiddleware,productOrder); //incomplete

//route: api/v1/user/delete
router.delete("/delete",(req,res,next)=>{
    console.log("through User-delete route");
    next();
},userMiddleware,userRemover);

// route: api/v1/user/orders
router.get("/orders",(req,res,next)=>{
    console.log("Through orders route for getting route");
    next();
},userMiddleware,adminMiddleware,orderGetter)

module.exports=router;