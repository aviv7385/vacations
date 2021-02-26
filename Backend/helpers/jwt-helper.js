const jwt = require("jsonwebtoken");

const key = "StrawberryFields";

function getNewToken(payload) {
    return jwt.sign(payload , key, { expiresIn: "15m" });
}

module.exports = {
    getNewToken
};
