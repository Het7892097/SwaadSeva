const jwt = require("jsonwebtoken");
const { secretKey } = require("./KeySettings");
function jwtGenerator(payload) {
  try {
    return jwt.sign(payload, secretKey, {
      expiresIn: "10d",
    });
  } catch (e) {
    console.error("Error generating jwt");
  }
}

module.exports = {
  jwtGenerator,
};
