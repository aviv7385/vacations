const express = require("express");
const authLogic = require("../business-logic-layer/auth-logic");
const usersLogic = require("../business-logic-layer/users-logic");
const router = express.Router();
const errorsHelper = require("../helpers/errors-helper");
const cryptoHelper = require("../helpers/crypto-helper");

// POST - register new user - "api/vacations/auth/register" (access allowed to any user)
router.post("/register", async (request, response) => {
    try {
        // check if username already exists
        const isUsername = await usersLogic.checkUsernameAsync(request.body.username);
        // if username is not taken - proceed to register
        if (isUsername.length === 0){
            const newUser = await authLogic.registerAsync(request.body);
            response.status(201).json(newUser);
        }
        else {
            response.status(400).send("Username is taken, please choose a different one");
            
        }
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// POST - login existing user - "api/vacations/auth/login" (access allowed to any user)
router.post("/login", async (request, response) => {
    try {
        const loggedInUser = await authLogic.loginAsync(request.body);
        if (!loggedInUser) {
            return response.status(401).send("Incorrect username or password, please try again or register");
        }
        response.json(loggedInUser);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;