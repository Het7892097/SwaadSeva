const bcrypt = require("bcrypt");
const { saltRounds } = require('./KeySettings');

async function hashVerifier(password, hash) {

    try {
        const isValid = await bcrypt.compare(password, hash);
        return isValid;
    }
    catch (e) {
        console.error("Error while verifying hash, Invlaid Password");
        return false;
    }

}

// hashVerifier("Het@7920","$2b$10$UvPnMTZ/FC/DkaWL4MNyGe7tpO1wkcszOhIwn6BDIzvn3oTYMNlsm")
// .then((result)=>{
//     console.log(result);
// })
async function hashGenerator(password) {

    try {
        const hash = await bcrypt.hash(password, saltRounds);
        // console.log(hash);
        return hash;
    }
    catch (e) {
        console.error("Error while generating hash");
        return "HashGeneratingError";
    }
}

module.exports={
    hashGenerator,hashVerifier
}
// hashGenerator("Het@7920")
// .then((result)=>{
//     console.log("Given hash: "+result);
// })