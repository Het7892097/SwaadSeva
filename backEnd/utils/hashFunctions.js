const bcrypt = require("bcrypt");
const { saltRounds } = require("./KeySettings");

async function hashVerifier(password, hash) {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (e) {
    console.error("Error while verifying hash, Invalid Password");
    return false;
  }
}

async function hashGenerator(password) {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (e) {
    console.error("Error while generating hash");
    return "HashGeneratingError";
  }
}

module.exports = {
  hashGenerator,
  hashVerifier,
};
