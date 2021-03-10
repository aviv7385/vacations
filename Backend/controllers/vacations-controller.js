const express = require("express");
const path = require("path");
const Vacation = require("../models/vacation");
const vacationsLogic = require("../business-logic-layer/vacations-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const socketHelper = require("../helpers/socket-io-helper");

const router = express.Router(); // Only the routing mechanism for our controller.


// GET all vacations - /api/vacations (access allowed to logged in users only)
router.get("/",verifyLoggedIn, async (request, response) => {
    try {
        const vacations = await vacationsLogic.getAllVacationsAsync();
        response.json(vacations);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


// GET one vacation - /api/vacations/7  (access allowed to logged in users only)
router.get("/:vacationId",async (request, response) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await vacationsLogic.getOneVacationAsync(vacationId);
        if (!vacation) {
            response.status(404).send(`id ${vacationId} not found.`);
        }
        response.json(vacation);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET image - /api/vacations/images/london.jpg (access allowed to logged in users only)
router.get("/images/:imageFileName", async (request, response) => {
    try {
        const imageFileName = request.params.imageFileName;
        const absolutePath = path.join(__dirname, "..", "images", imageFileName);
        response.sendFile(absolutePath);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



module.exports = router; // Expose only the router.