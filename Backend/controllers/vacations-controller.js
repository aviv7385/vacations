const express = require("express");
const path = require("path");
const Vacation = require("../models/vacation");
const vacationsLogic = require("../business-logic-layer/vacations-logic");
const { response } = require("express");

const router = express.Router(); // Only the routing mechanism for our controller.

// GET all vacations - /api/vacations
router.get("/vacations", async (request, response) => {
    try {
        const vacations = await vacationsLogic.getAllVacationsAsync();
        response.json(vacations);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// GET on vacation - /api/vacations/7
router.get("/vacations/:vacationId", async (request, response) => {
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

// POST - add new vacation (only ADMIN) - /api/vacations
router.post("/vacations", async (request, response) => {
    try {
        const vacation = new Vacation(request.body);
        const error = vacation.validatePost();
        if (error) {
            response.status(400).send(error);
            return;
        }
        const addedVacation = await vacationsLogic.addOneVacation(vacation, request.files ? request.files.image : null);
        response.status(201).json(addedVacation);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT - update full vacation (only ADMIN) - /api/vacations/7
router.put("/vacations/:vacationId", async (request, response) => {
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

// PATCH - update partial vacation info (only ADMIN) - /api/vacations/7
router.patch("/vacations/:vacationId", async (request, response) => {
    try {
        const vacation = new Vacation(request.body);
        vacation.vacationId = +request.params.vacationId;
        const error = vacation.validatePatch();
        if (error) {
            response.status(400).send(error);
            return;
        }
        const updatedVacation = await vacationsLogic.updatePartialVacation(vacation);
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

// DELETE - remove one vacation (only ADMIN) - /api/vacations/7
router.delete("/vacations/:vacationId", async (request, response) => {
    try {
        const vacationId = +request.params.vacationId;
        await vacationsLogic.deleteOneVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router; // Expose only the router.