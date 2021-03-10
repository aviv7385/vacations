const usersLogic = require("../business-logic-layer/users-logic");
const errorsHelper = require("../helpers/errors-helper");
const express = require("express");
const router = express.Router();

// GET all users - /api/vacations/users
router.get("/", async (request, response) => {
    try {
        const users = await usersLogic.getAllUsersAsync();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET one users - /api/vacations/users/uuid
router.get("/:uuid", async (request, response) => {
    try {
        const uuid = +request.params.uuid
        const user = await usersLogic.getOneUserAsync(uuid);
        if (!user) {
            response.status(404).send(`User not found.`);
        }
        response.json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;