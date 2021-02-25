global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const fileUpload = require("express-fileupload");
const vacationsController = require("./controllers/vacations-controller");
const authController = require("./controllers/auth-controller");
const followsController = require("./controllers/follows-controller");
const usersController = require("./controllers/users-controllers");
const cors = require("cors");

const server = express(); // Create the entire server.

server.use(express.json()); // Create "body" property from the given JSON.

server.use(fileUpload());

// enable CORS to all clients
server.use(cors());

// When frontend requesting our server - transfer that request to the controller's router.
server.use("/api/vacations", vacationsController);
server.use("/api/auth", authController);
server.use("/api/follows", followsController);
server.use("/api/users", usersController);


server.use("*", (request, response) => {
    response.status(404).send("Route not found");
});

server.listen(3001, () => console.log("Listening..."));
