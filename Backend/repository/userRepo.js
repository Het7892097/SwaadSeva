const { User, Order } = require("../DB/index");
const { userCreateValidator, MobNoValidator, UserLoggingValidator, UserUpdaterValidator } = require("../validators/userValidator");
const { userOrderValidator } = require("../validators/productValidator");
const { jwtGenerator } = require("../utils/jwtGenerator");
const { hashGenerator, hashVerifier } = require("../utils/hashFunctions");
const { adminKey } = require("../utils/KeySettings");
const mongo = require("mongoose");

async function creator(reqBody, ipAdminKey) {
    reqBody.password = await hashGenerator(reqBody.password); //hashing password
    // console.log(ipAdminKey);
    const isValid = userCreateValidator(reqBody);
    if (!isValid) {
        return "InvalidUserDetails";
    }
    if (reqBody.isAdmin == true && ipAdminKey != adminKey) {
        return "InvalidAdminKey"
    }
    //else 
    let userExistence = await userGetter(reqBody.mobNo);
    if (userExistence != null) {
        return "UserAlreadyExist";
    }
    //Creating an User-Entry in DB

    //Also check for admin-user creation to have correct Admin Key in admin-controller
    let isAdmin = reqBody.isAdmin ?? false;

    try {
        await User.create({
            mobNo: reqBody.mobNo,
            password: reqBody.password,
            name: reqBody.name,
            isAdmin: isAdmin
        })
        const token = jwtGenerator({ mobNo: reqBody.mobNo, isAdmin: isAdmin })
        return token;

    }
    catch (e) {
        console.error("Error occurred while creating an user"+e.message);
        return "DBCreationFailed"
    }

}


async function logger(reqBody) {
    const isValid = UserLoggingValidator(reqBody);
    if (!isValid) {
        return "InvalidUserDetails";
    }
    //else 
    const targetUser = await userGetter(reqBody.mobNo);
    if (targetUser == null) {
        return "UserNotExists";
    }
    if (!(await hashVerifier(reqBody.password, targetUser.password))) {
        return "InvalidUserCredentials";
    }

    const isAdmin = targetUser["isAdmin"];

    return jwtGenerator({ mobNo: reqBody.mobNo, isAdmin: isAdmin });

}

async function updater(reqBody, decodedToken) {
    if (reqBody.mobNo) {
        console.error("Cannot change the mobile no of any user"+e.message);
        return "CannotChangeMobileNo";
    }

    const isValid = UserUpdaterValidator(reqBody);

    if (!isValid) {
        return "InvalidUserDetails";
    }

    try {
        if (reqBody.password) {
            reqBody.password = await hashGenerator(reqBody.password)
        }
        await User.updateOne({ mobNo: decodedToken["mobNo"] }, {
            $set: reqBody
        });
        // console.log(targetUser);
        return "UserUpdationSuccess";
    }
    catch (e) {
        console.error("Error occured while updating user"+e.message);
        return "DBUpdationFailed";
    }

}

async function remover(decodedToken) {

    try {
        await User.deleteOne({ mobNo: decodedToken["mobNo"] });
        return "UserDeletionSuccess"
    }
    catch (e) {
        console.error("Error occurrd while deleting User");
        return "DBDeletionFailed";
    }
}

async function orderer(userOrder, decodedToken) {

    // console.log("decoded Token");
    // console.log(decodedToken);

    const targetUser = await User.findOne({ mobNo: decodedToken["mobNo"] });
    if (!targetUser) {
        return "UserNotExists";
    }

    // console.log("UserExists");

    const isValid = userOrderValidator(userOrder);
    if (!isValid) {
        return "InvalidOrderDetails";
    }
    // console.log("Valid Order-details");
    let currentDateObj = new Date();
    const currentDate = currentDateObj.toDateString().slice(4, 15);
    const currentTime = currentDateObj.toTimeString().slice(0, 8);

    // console.log(currentDate+" "+currentTime);

    const alteredOrderList = userOrder.map(order => ({
        userId: targetUser._id, // Access the first element since `find()` returns an array
        orderedTime: currentTime.toString(),
        name: order.name,
        quantity: order.quantity,
        isCompleted: false,
        orderId:`${targetUser._id}-${currentTime}`
    }));
    // console.log(alteredOrderList);

    const session=await mongo.startSession();
    session.startTransaction();

    try {
    todayOrder = await Order.findOne({
        orderDate: currentDate
    }).session(session);
    if (!todayOrder) {
        todayOrder = new Order({
            orderDate: currentDate,
            orders: []
        });
    }
    todayOrder.orders.push(...alteredOrderList);
    
        await todayOrder.save({session});
        await session.commitTransaction();
        session.endSession();
        return { message:"OrderedSuccessfully",
            orderId:`${targetUser._id}-${currentTime}`
        };
    }
    catch (e) {
        console.error("Error occurred while Ordering "+e.message);
       await session.abortTransaction();
        session.endSession();
        return "OrderFailed";
    }
}

async function adminChecker(mobNo) {
    // console.log(mobNo);
    const targetUser = await User.findOne({
        mobNo: mobNo.toString()
    });
    // console.log(targetUser);
    if (!targetUser) {
        return "UserNotExists"
    }
    else {
        return targetUser.isAdmin ? "UserIsAdmin" : "UserIsNotAdmin"
    }
}

async function userGetter(mobNo) {

    const isValidNo = MobNoValidator(mobNo);
    if (!isValidNo) {
        console.error("Invalid Indian mobile no foramt"+e.message);
        return null;
    }

    //fetching User using this MobileNo
    try {
        return await User.findOne({
            mobNo: mobNo
        });
    }
    catch (e) {
        console.error("Some error occured while fetching User"+e.message);
        return null;
    }
}

module.exports = {
    creator, remover, updater, logger, adminChecker,orderer
}