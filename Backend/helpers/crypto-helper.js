const crypto = require("crypto");

// helper to crypt users passwords

const salt = "GoHomeYouAreDrunk";

function hash(plainText) {
    // Hashing with salt:
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

module.exports = {
    hash
};