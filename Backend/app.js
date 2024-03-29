global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const fileUpload = require("express-fileupload");
const vacationsController = require("./controllers/vacations-controller");
const authController = require("./controllers/auth-controller");
const followsController = require("./controllers/follows-controller");
const usersController = require("./controllers/users-controllers");
const adminController = require("./controllers/admin-controller");
const socketHelper = require("./helpers/socket-io-helper");
const cors = require("cors");

const server = express(); // Create the entire server.

server.use(express.json()); // Create "body" property from the given JSON.

server.use(fileUpload());

// enable CORS to all clients
server.use(cors());

// When frontend requesting our server - transfer that request to the controller's router.
server.use("/api/vacations", vacationsController);
server.use("/api/vacations/auth", authController);
server.use("/api/vacations/follows", followsController);
server.use("/api/vacations/users", usersController);
server.use("/api/admin/vacations", adminController);

server.use("*", (request, response) => {
    response.status(404).send("Route not found");
});


const expressListener = server.listen(3001, () => console.log("Listening..."));
socketHelper.init(expressListener);
