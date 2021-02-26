const express = require("express");
const path = require("path");
const Vacation = require("../models/vacation");
const vacationsLogic = require("../business-logic-layer/vacations-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const verifyAdmin = require("../middleware/verify-admin");

const router = express.Router(); // Only the routing mechanism for our controller.


// GET all vacations - /api/vacations (access allowed to logged in users only)
router.get("/", /*verifyLoggedIn,*/ async (request, response) => {
    try {
        const vacations = await vacationsLogic.getAllVacationsAsync();
        response.json(vacations);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET one vacation - /api/vacations/7  (access allowed to logged in users only)
router.get("/:vacationId", async (request, response) => {
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
router.get("/images/:imageFileName",/*verifyLoggedIn,*/ async (request, response) => {
    try {
        const imageFileName = request.params.imageFileName;
        const absolutePath = path.join(__dirname, "..", "images", imageFileName);
        response.sendFile(absolutePath);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// POST - add new vacation - /api/vacations (access allowed to admin only)
router.post("/", /*verifyAdmin,*/ async (request, response) => {
    try {
        const vacation = new Vacation(request.body);
        // const error = vacation.validatePost();
        // if (error) {
        //     response.status(400).send(error);
        //     return;
        // }
        const addedVacation = await vacationsLogic.addOneVacationAsync(vacation, request.files ? request.files.image : null);
        response.status(201).json(addedVacation);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT - update full vacation - /api/vacations/7 (access allowed to admin only)
router.put("/:vacationId",/*verifyAdmin,*/ async (request, response) => {
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
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PATCH - update partial vacation info - /api/vacations/7 (access allowed to admin only)
router.patch("/:vacationId",/*verifyAdmin,*/ async (request, response) => {
    try {
        const vacation = new Vacation(request.body);
        vacation.vacationId = +request.params.vacationId;
        const error = vacation.validatePatch();
        if (error) {
            response.status(400).send(error);
            return;
        }
        const updatedVacation = await vacationsLogic.updatePartialVacationAsync(vacation);
        if (!updatedVacation) {
            response.status(404).send(`id ${updatedVacation.vacationId} not found.`);
            return;
        }
        response.json(updatedVacation);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE - remove one vacation - /api/vacations/7 (access allowed to admin only)
router.delete("/:vacationId",/*verifyAdmin,*/ async (request, response) => {
    try {
        const vacationId = +request.params.vacationId;
        await vacationsLogic.deleteOneVacationAsync(vacationId);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router; // Expose only the router.