const express = require("express");
const Follow = require("../models/follow");
const followsLogic = require("../business-logic-layer/follows-logic");
const usersLogic = require("../business-logic-layer/users-logic");
const errorsHelper = require("../helpers/errors-helper");
const router = express.Router();

// get all vacations a specific user follows - /api/follows/:uuid
router.get("/:uuid", async (request, response) => {
    try {
        const uuid = request.params.uuid;
        const follows = await followsLogic.getAllFollowedVacationsAsync(uuid);
        if (!follows) {
            response.status(404).send(`No follows were found`);
        }
        response.json(follows);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});


// add new follow - /api/follow/
router.post("/", async (request, response) => {
    try {
        const follow = new Follow(request.body);
        const newFollow = await followsLogic.followNewVacationAsync(follow);
        response.status(201).json(newFollow);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

// DELETE - remove a follow from a vacation - /api/follows/:uuid/:vacationId
router.delete("/:uuid/:vacationId", async (request, response) => {
    try {
        const vacationId = +request.params.vacationId;
        const uuid = request.params.uuid;
        const users = await usersLogic.getAllUsersAsync();
        const user = users.find(u =>  u.uuid === uuid );
        await followsLogic.removeFollowAsync(user.userId, vacationId);

        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// get number of follows for each vacation - /api/follows/count-follows/2
router.get("/count-follows/:vacationId", async (request, response) => {
    try {
        const vacationId = +request.params.vacationId;
        const numberOfFollows = await followsLogic.getNumberOfFollowsAsync(vacationId);
        response.json(numberOfFollows);
    }
    catch (err) {
        response.status(500).send(errorsHelper.getError(err));
    }
});

module.exports = router;