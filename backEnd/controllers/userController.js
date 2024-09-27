const {
  creator,
  remover,
  updater,
  logger,
  orderer,
  detailer,
  orderLister,
  completer,
} = require("../repository/userRepo");

const userCreator = async (req, res) => {
  const result = await creator(req.body, req.params.adminKey);
  // console.log("result is"+result); //for debugging
  if (result == "InvalidUserDetails") {
    return res.status(400).json({
      message: "Invalid User Details",
    });
  } else if (result == "InvalidAdminKey") {
    return res.status(401).json({
      message:
        "Unauthorized to be an Admin, as adminKey not provided or it's  incorrect",
    });
  } else if (result == "UserAlreadyExist") {
    return res.status(409).json({
      message: "User already exists, so try changing mobile-no or try signin",
    });
  } else if (result == "DBCreationFailed") {
    return res.status(500).json({
      message: "Failed to create user, try again later",
    });
  } else {
    return res.status(200).json({
      message: "User Created Successfully",
      token: result,
    });
  }
};

const userDetailer = async (req, res) => {
  // console.log("Inside detailer controller"); //for debugging
  if (!req.headers.authtoken) {
    return res.status(401).json({
      message: "No Token Provided",
    });
  }
  const result = await detailer(req.headers.authtoken);
  if (result == "InvalidToken") {
    return res.status(404).json({
      message: "Invalid-Token",
    });
  } else if (result == "ErrorFetchingUser") {
    return res.status(500).json({
      message: "DB Error",
    });
  } else {
    // console.log(result);
    return res.status(200).json({
      message: "User's token is valid",

      result: {
        name: result.name,
        mobNo: result.mobNo,
        isAdmin: result.isAdmin,
      },
    });
  }
};

const userLogger = async (req, res) => {
  const result = await logger(req.body);
  console.log(result);
  if (result == "InvalidUserDetails") {
    return res.status(400).json({
      message: "Invalid user details",
    });
  } else if (result == "UserNotExists") {
    return res.status(404).json({
      message: "User not exists, try changing mobile no or try signup",
    });
  } else if (result == "InvalidUserCredentials") {
    return res.status(401).json({
      message: "Invalid User-credentials",
    });
  } else {
    return res.status(200).json({
      message: "User is valid",
      token: result.token,
      isAdmin: result.isAdmin,
      name: result.name,
    });
  }
};

const userUpdater = async (req, res) => {
  const result = await updater(req.body, req.decodedToken);
  if (result == "CannotChangeMobileNo") {
    return res.status(409).json({
      message: "Cannot change the mobile-no",
    });
  } else if (result == "InvalidUserDetails") {
    return res.status(400).json({
      message: "Invalid user details",
    });
  } else if (result == "UserUpdationSuccess") {
    return res.status(200).json({
      message: "User Updation Successful",
    });
  } else {
    return res.status(500).json({
      message: "User updation failed",
    });
  }
};

const userRemover = async (req, res) => {
  const result = await remover(req.decodedToken);

  if (result == "UserDeletionSuccess") {
    return res.status(200).json({
      message: "User deletion Successful",
    });
  } else {
    return res.status(500).json({
      message: "USer deletion failed, try again later",
    });
  }
};

const productOrder = async (req, res) => {
  console.log("inside producOrder");
  const result = await orderer(req.body.userOrder, req.decodedToken);
  // console.log(result); //for debugging
  if (result == "UserNotExists") {
  } else if (result == "InvalidOrderDetails") {
    return res.status(400).json({
      message: "Invalid order details",
    });
  } else if (result.message == "OrderedSuccessfully") {
    return res.status(200).json({
      message: "Ordered Successfully",
      orderId: result.orderId,
    });
  } else {
    return res.status(500).json({
      message: "Ordered Failed",
    });
  }
};

const orderGetter = async (req, res) => {
  const result = await orderLister();
  console.log(result);
  if (result == "FetchError") {
    res.status(500).json({
      message: "Error fetching Order List",
    });
  } else {
    // console.log("REsult orders");
    // console.log(result[0].orders)
    res.status(200).json({
      todayOrders: result[0].orders,
    });
  }
};

const orderCompleter = async (req, res) => {
  //   console.log("completer-controller"); //for debugging

  const orderId = req.body.orderId;

  try {
    const updateResult = await completer(orderId);

    // Check the result and respond accordingly
    if (updateResult === "UpdationSuccess") {
      return res.status(200).json({ message: "Order completed successfully." });
    } else if (updateResult === "OrderNotFound") {
      return res.status(404).json({ message: "Order not found." });
    } else {
      return res.status(500).json({ message: "Failed to update the order." });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ message: "An error occurred while updating the order." });
  }
};

module.exports = {
  userCreator,
  userLogger,
  userRemover,
  userUpdater,
  productOrder,
  userDetailer,
  orderGetter,
  orderCompleter,
};
