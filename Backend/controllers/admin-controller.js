const express = require("express");
const path = require("path");
const Vacation = require("../models/vacation");
const socketHelper = require("../helpers/socket-io-helper");
const vacationsLogic = require("../business-logic-layer/vacations-logic");
const verifyAdmin = require("../middleware/verify-admin");

const router = express.Router(); // Only the routing mechanism for this controller.


// GET all vacations - /api/admin/vacations (access allowed to ADMIN only)
router.get("/", verifyAdmin, async (request, response) => {
    try {
        const vacations = await vacationsLogic.getAllVacationsAsync();
        response.json(vacations);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET one vacation - /api/admin/vacations/7  (access allowed to ADMIN only)
router.get("/:vacationId", verifyAdmin, async (request, response) => {
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

// GET image - /api/admin/vacations/images/london.jpg (access allowed to ADMIN only)
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

// POST - add new vacation - /api/admin/vacations (access allowed to ADMIN only)
router.post("/", verifyAdmin, async (request, response) => {
    try {
        const vacation = new Vacation(request.body);
        const addedVacation = await vacationsLogic.addOneVacationAsync(vacation, request.files ? request.files.image : null);
        response.status(201).json(addedVacation);
        // send socket.io added message to front
        socketHelper.vacationsChanged();
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT - update full vacation - /api/admin/vacations/7 (access allowed to ADMIN only)
router.put("/:vacationId", verifyAdmin, async (request, response) => {
    try {
        const vacation = new Vacation(request.body);
        vacation.vacationId = +request.params.vacationId;
        const error = vacation.validatePut();
        if (error) {
            response.status(400).send(error);
            return;
        }
        const updatedVacation = await vacationsLogic.updateFullVacationAsync(vacation);
        if (!updatedVacation) {
            response.status(404).send(`id ${updatedVacation.vacationId} not found.`);
            return;
        }
        response.json(updatedVacation);

        // send socket.io updated message to front
        socketHelper.vacationsChanged();
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PATCH - update partial vacation info - /api/admin/vacations/7 (access allowed to ADMIN only)
router.patch("/:vacationId", verifyAdmin, async (request, response) => {
    try {
        const vacation = new Vacation(request.body);
        vacation.vacationId = +request.params.vacationId;
        const updatedVacation = await vacationsLogic.updatePartialVacationAsync(vacation, request.files ? request.files.image : null);
        if (!updatedVacation) {
            response.status(404).send(`id ${updatedVacation.vacationId} not found.`);
            return;
        }
        response.json(updatedVacation);
        socketHelper.vacationsChanged();
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE - remove one vacation - /api/admin/vacations/7 (access allowed to ADMIN only)
router.delete("/:vacationId", verifyAdmin, async (request, response) => {
    try {
        const vacationId = +request.params.vacationId;
        await vacationsLogic.deleteOneVacationAsync(vacationId);
        response.sendStatus(204);

        // send socket.io deleted message to front
        socketHelper.vacationsChanged();
    }
    catch (err) {
        console.log("request: " + request.body);
        console.log("response: " + response);
        response.status(500).send(err.message);
    }
});

module.exports = router; // Expose only the router.