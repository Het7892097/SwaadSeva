const { adminChecker } = require("../repository/userRepo")

async function adminMiddleware(req, res, next) {
    // console.log(req.decodedToken["mobNo"]);
    
    const result = await adminChecker(req.decodedToken["mobNo"]);
    // console.log(result);
    if (result == "UserNotExists") {
        res.status(404).json({
            message:"User not exists"
        });
    }
    else if (result == "UserIsAdmin") {
        next();
    }
    else {
        res.status(401).json({
            message:"User is not Admin"
        });
    }
}

module.exports={
    adminMiddleware
}