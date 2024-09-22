const jwt = require("jsonwebtoken");
const { User, Order} = require("../DB/index");
const { userCreateValidator,MobNoValidator, UserUpdaterValidator } = require("../validators/userValidator");
const {userOrderValidator}=require("../validators/productValidator");
const {jwtGenerator}=require("../utils/jwtGenerator");

async function AdminChecker(mobNo){
    const targetUser=await User.findOne({
        mobNo:mobNo,
        isAdmin:true
    });
    
    targetUser?  true:false;
}