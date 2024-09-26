const {jwtVerifier}=require("../utils/jwtVerifier")

function userMiddleware(req,res,next){

    token=req.headers["authorization"];
    // console.log(token);
    const tokenValidity = jwtVerifier(token);
    if (!tokenValidity) {
       return res.status(401).json({
            message:"Invalid Token or Either Expired"
        })
    }
    req.decodedToken=tokenValidity;
    console.log("Passed user middleware");
    next();    
};

module.exports={
    userMiddleware
}