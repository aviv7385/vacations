global.config = require(process.env.NODE_ENV === "production" ? "./config-prod.json" : "./config-dev.json");
const express = require("express");
const fileUpload = require("express-fileupload");
const vacationsController = require("./controllers/vacations-controller");
const cors = require("cors");

const server = express(); // Create the entire server.

server.use(express.json()); // Create "body" property from the given JSON.

server.use(fileUpload());

// enable CORS to all clients
server.use(cors());

server.use("/api", vacationsController); // When frontend requesting our server - transfer that request to the controller's router.

server.use("*", (request, response) => {
    response.status(404).send("Route not found");
});

server.listen(3001, () => console.log("Listening..."));
