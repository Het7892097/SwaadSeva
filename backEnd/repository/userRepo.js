const { User, Order } = require("../DB/index");
const {
  userCreateValidator,
  MobNoValidator,
  UserLoggingValidator,
  UserUpdaterValidator,
} = require("../validators/userValidator");
const { userOrderValidator } = require("../validators/productValidator");
const { jwtGenerator } = require("../utils/jwtGenerator");
const { hashGenerator, hashVerifier } = require("../utils/hashFunctions");
const { adminKey } = require("../utils/KeySettings");
const mongo = require("mongoose");
const { jwtVerifier } = require("../utils/jwtVerifier");

async function creator(reqBody, ipAdminKey) {
  reqBody.password = await hashGenerator(reqBody.password); //hashing password
  const isValid = userCreateValidator(reqBody);
  if (!isValid) {
    return "InvalidUserDetails";
  }
  // console.log(ipAdminKey);
  if (reqBody.isAdmin == true && (!ipAdminKey || ipAdminKey != adminKey)) {
    return "InvalidAdminKey";
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
      isAdmin: isAdmin,
    });
    const token = jwtGenerator({ mobNo: reqBody.mobNo, isAdmin: isAdmin });
    return token;
  } catch (e) {
    console.error("Error occurred while creating an user" + e.message);
    return "DBCreationFailed";
  }
}

async function orderLister() {
  const today = new Date();

  // Get the start of the day (00:00:00)
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));

  // Get the end of the day (23:59:59.999)
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  try {
    const orders = await Order.find({
      orderDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
    if (!orders) {
      return "FetchError";
    }
    return orders; // Return the list of today's orders
  } catch (e) {
    console.error("Error while fetching Orders");
    return "FetchError";
  }
}

async function completer(orderId) {
  // Define the start and end of the day
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  try {
    let todayOrders = await orderLister();
    todayOrders = todayOrders[0]?.orders || [];

    const ordersToUpdate = todayOrders.filter(
      (order) => order.orderId === orderId
    );

    if (ordersToUpdate.length === 0) {
      return "OrderNotFound";
    }

    ordersToUpdate.forEach((order) => {
      order.isCompleted = true;
    });

    await Order.updateOne(
      {
        "orders.orderId": orderId,
        orderDate: { $gte: startOfDay, $lt: endOfDay },
      },
      { $set: { "orders.$[elem].isCompleted": true } },
      { arrayFilters: [{ "elem.orderId": orderId }] }
    );

    return "UpdationSuccess";
  } catch (e) {
    console.error("Error updating orders:", e);
    return "UpdationFailed";
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

  return {
    token: jwtGenerator({ mobNo: reqBody.mobNo, isAdmin: isAdmin }),
    isAdmin: targetUser.isAdmin,
    name: targetUser.name,
  };
}

async function detailer(token) {
  if (!token) {
    console.error("Token not provided");
    return "NoToken";
  }

  const tokenValidity = jwtVerifier(token);
  if (!tokenValidity) {
    return "InvalidToken";
  } else {
    try {
      const targetUser = await userGetter(tokenValidity.mobNo); // Await the async function
      return {
        mobNo: targetUser.mobNo,
        name: targetUser.name,
        isAdmin: targetUser.isAdmin,
      };
    } catch (e) {
      console.error("Error fetching user:", e.message); // Log the error message
      return "ErrorFetchingUser";
    }
  }
}

async function updater(reqBody, decodedToken) {
  if (reqBody.mobNo) {
    console.error("Cannot change the mobile no of any user" + e.message);
    return "CannotChangeMobileNo";
  }

  const isValid = UserUpdaterValidator(reqBody);

  if (!isValid) {
    return "InvalidUserDetails";
  }

  try {
    if (reqBody.password) {
      reqBody.password = await hashGenerator(reqBody.password);
    }
    await User.updateOne(
      { mobNo: decodedToken["mobNo"] },
      {
        $set: reqBody,
      }
    );
    // console.log(targetUser);
    return "UserUpdationSuccess";
  } catch (e) {
    console.error("Error occured while updating user" + e.message);
    return "DBUpdationFailed";
  }
}

async function remover(decodedToken) {
  try {
    await User.deleteOne({ mobNo: decodedToken["mobNo"] });
    return "UserDeletionSuccess";
  } catch (e) {
    console.error("Error occurrd while deleting User");
    return "DBDeletionFailed";
  }
}

async function orderer(userOrder, decodedToken) {
  console.log("Inside user repo");
  const targetUser = await User.findOne({ mobNo: decodedToken["mobNo"] });
  if (!targetUser) {
    return "UserNotExists";
  }

  const isValid = userOrderValidator(userOrder);
  if (!isValid) {
    console.error("Invalid Product details");
    return "InvalidOrderDetails";
  }

  const currentDateObj = new Date();

  // Get the local date and time
  const currentDate = currentDateObj.toLocaleString("en-CA", {
    dateStyle: "short",
  }); // Format: YYYY-MM-DD
  const currentTime = currentDateObj.toLocaleString("en-US", {
    timeStyle: "short",
    hour12: false,
  }); // Format: HH:MM:SS

  // Construct order list
  const alteredOrderList = userOrder.map((order) => ({
    userId: targetUser._id,
    orderedTime: currentTime,
    name: order.name,
    quantity: order.quantity,
    isCompleted: false,
    orderId: `${targetUser._id}-${currentTime}`,
  }));

  const session = await mongo.startSession();
  session.startTransaction();

  try {
    let todayOrder = await Order.findOne({
      orderDate: currentDate,
    }).session(session);

    if (!todayOrder) {
      todayOrder = new Order({
        orderDate: currentDate,
        orders: [],
      });
    }

    todayOrder.orders.push(...alteredOrderList);
    await todayOrder.save({ session });
    await session.commitTransaction();
    session.endSession();

    return {
      message: "OrderedSuccessfully",
      orderId: `${targetUser._id}-${currentTime}`,
    };
  } catch (e) {
    console.error("Error occurred while Ordering " + e.message);
    await session.abortTransaction();
    session.endSession();
    return "OrderFailed";
  }
}

async function orderLister() {
  const today = new Date();

  // Get the start of the day (00:00:00)
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));

  // Get the end of the day (23:59:59.999)
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  try {
    const orders = await Order.find({
      orderDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });
    // console.log(orders);
    return orders;
  } catch (e) {
    console.error("Error while fetching Orders");
    return "FetchError";
  }
}

async function adminChecker(mobNo) {
  // console.log(mobNo);
  const targetUser = await User.findOne({
    mobNo: mobNo.toString(),
  });
  // console.log(targetUser);
  if (!targetUser) {
    return "UserNotExists";
  } else {
    return targetUser.isAdmin ? "UserIsAdmin" : "UserIsNotAdmin";
  }
}

async function userGetter(mobNo) {
  const isValidNo = MobNoValidator(mobNo);
  if (!isValidNo) {
    console.error("Invalid Indian mobile no foramt" + e.message);
    return null;
  }

  //fetching User using this MobileNo
  try {
    return await User.findOne({
      mobNo: mobNo,
    });
  } catch (e) {
    console.error("Some error occured while fetching User" + e.message);
    return null;
  }
}

module.exports = {
  creator,
  remover,
  updater,
  logger,
  adminChecker,
  orderer,
  detailer,
  orderLister,
  completer,
};
