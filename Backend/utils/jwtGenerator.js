const jwt=require("jsonwebtoken");
const {secretKey} = require("./KeySettings");
// console.log(secretKey);
function jwtGenerator(payload) {
    try {
        return jwt.sign(payload, secretKey,{
            expiresIn:"10d"
        });
    } catch (e) {
        console.error("Error generating jwt");
    }
}

// console.log(typeof(jwtGenerator({name:"Het"})));
module.exports={
    jwtGenerator
}