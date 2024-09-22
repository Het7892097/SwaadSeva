const { creator, remover, updater, logger,orderer } = require("../repository/userRepo");

const userCreator = async (req, res) => {
    const result = await creator(req.body, req.params.adminKey);
    if (result == "InvalidUserDetails") {
        return res.status(400).json({
            message: "Invalid User Details"
        });
    }
    else if (result == "InvalidAdminKey") {
        return res.status(401).json({
            message: "Unauthorized to be an Admin, adminKey is incorrect"
        });
    }
    else if (result == "UserAlreadyExist") {
        return res.status(409).json({
            message: "User already exists, so try changing mobile-no or try signin"
        });
    }
    else if (result == "DBCreationFailed") {
        return res.status(500).json({
            message: "Failed to create user, try again later"
        });
    }
    else {
        return res.status(200).json({
            message: "User Created Successfully",
            token: result
        });
    }
}


const userLogger = async (req, res) => {
    const result = await logger(req.body);

    if (result == "InvalidUserDetails") {
        return res.status(400).json({
            message: "Invalid user details"
        });
    }
    else if (result == "UserNotExists") {
        return res.status(404).json({
            message: "User not exists, try changing mobile no or try signup"
        })
    }
    else if (result == "InvalidUserCredentials") {
        return res.status(401).json({
            message: "Invalid password or mobile-no"
        });
    }
    else {
        return res.status(200).json({
            message:"User is valid",
            token:result
        })
    }
}

const userUpdater = async (req, res) => {
    const result = await updater(req.body, req.decodedToken);
    if (result == "CannotChangeMobileNo") {
        return res.status(400).json({
            message: "Cannot change the mobile-no"
        });
    }
    else if (result == "InvalidUserDetails") {
        return res.status(400).json({
            message: "Invalid user details"
        });
    }
    else if (result == "UserUpdationSuccess") {
        return res.status(200).json({
            message: "User Updation Successful"
        });
    }
    else {
        return res.status(500).json({
            message: "User updation failed"
        });
    }
}

const userRemover = async (req, res) => {
    const result = await remover(req.decodedToken);

    if (result == "UserDeletionSuccess") {
        return res.status(200).json({
            message: "User deletion Successful"
        });
    }
    else {
        return res.status(500).json({
            message: "USer deletion failed, try again later"
        });
    }
}

const productOrder=async (req,res)=>{
    const result=await orderer(req.body.userOrder,req.decodedToken);
    if(result=="UserNotExists"){
        
    }
    else if(result=="InvalidOrderDetails"){
        return res.status(400).json({
            message: "Invalid order details"
        });
    }
    else if(result.message=="OrderedSuccessfully"){

        return res.status(200).json({
            message: "Ordered Successfully",
            orderId:result.orderId
        });
    }
    else{
        return res.status(500).json({
            message: "Ordered Failed"
        });
    }
}

module.exports = {
    userCreator, userLogger, userRemover, userUpdater,productOrder
}