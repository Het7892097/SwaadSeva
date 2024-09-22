const express=require("express");
const router=express.Router();
const {userCreator,userLogger,userRemover,userUpdater,productOrder}=require("../controllers/userController");
const {userMiddleware}=require("../middlewares/userMiddleware")

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

module.exports=router;