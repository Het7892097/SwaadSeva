const { jwtVerifier } = require("../utils/jwtVerifier");

function userMiddleware(req, res, next) {
  // console.log("headers");
  // console.log(req.headers); //for cheking if the headers required are provided or not
  token = req.headers["authtoken"];
  const tokenValidity = jwtVerifier(token);
  if (!tokenValidity) {
    return res.status(401).json({
      message: "Invalid Token or Either Expired",
    });
  }
  req.decodedToken = tokenValidity;
  console.log("Passed user middleware");
  next();
}

module.exports = {
  userMiddleware,
};
