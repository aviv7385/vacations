const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const router = express.Router();
const errorsHelper = require("../helpers/errors-helper");
const cryptoHelper = require("../helpers/crypto-helper");

// POST - register new user - "api/register"
router.post("/register", async (request, response) => {
    try {
        const newUser = await authLogic.registerAsync(request.body);
        response.status(201).json(newUser);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// POST - login existing user - "api/login"
router.post("/login", async (request, response) => {
    try {
        const loggedInUser = await authLogic.loginAsync(request.body);
        if (!loggedInUser) {
            return response.status(401).send("Incorrect username or password.");
        }
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;