const express=require("express");
const router=express.Router();
const {adminMiddleware}=require("../middlewares/adminMiddleware");
const {userMiddleware}=require("../middlewares/userMiddleware");
const { productCreator,productLister,productRemover,productUpdater, productCategLister, paymentHandler } = require("../controllers/productController");

//base route: api/v1/product

// route: api/v1/product/lister
router.get("/lister",productLister);


// route: api/v1/product/categLister
router.get("/categLister",productCategLister);

// route: api/v1/product/create
router.post("/create",(req,res,next)=>{
    console.log("Through create route");
    next();
},userMiddleware,adminMiddleware,productCreator);

// route: api/v1/product/update
router.patch("/update",paymentHandler);

// route: api/v1/product/delete
router.delete("/delete",userMiddleware,adminMiddleware,productRemover);

module.exports=router;