const { secretKey } = require("./KeySettings");
const jwt = require("jsonwebtoken");
function jwtVerifier(token) {
  // console.log(token); //for checking if right token is provided
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (e) {
    console.error("Invalid Token");
    return null;
  }
}

module.exports = {
  jwtVerifier,
};
