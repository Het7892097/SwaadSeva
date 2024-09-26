const {secretKey}=require("./KeySettings");
const jwt=require("jsonwebtoken");
console.log(secretKey);
function jwtVerifier(token) {
    console.log(token);
    try {
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded)
        return decoded
    }
    catch (e) {
        console.error("Invalid Token");
        return null;
    }
}

module.exports={
    jwtVerifier
}
// console.log(jwtVerifier("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JObyI6Iis5MTgyMDA3NDk0NjAiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MjcwMDU0MTgsImV4cCI6MTcyNzg2OTQxOH0.3A3d07eJCa49MYfgHPS8g_ae4mGOwM4HUwCuu2ZHfzI"))
