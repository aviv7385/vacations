const io = require("socket.io");
const vacationsLogic = require("../business-logic-layer/vacations-logic");
const followsLogic = require("../business-logic-layer/follows-logic");

let socketServer;

function init(expressListener) {
    socketServer = io(expressListener, { cors: { origin: "http://localhost:3000" } });
    socketServer.sockets.on("connection", socket => {
        socket.join("/");
        socket.emit("test");
        console.log("Client Connected. Total clients: ", socketServer.engine.clientsCount);
        socket.on("disconnect", () => console.log("Client Disconnected. Total clients: ", socketServer.engine.clientsCount));
    });
}

// after any change to the vacations - send all the vacations to the client
async function vacationsChanged(vacations) {
    if (typeof vacations == "undefined") {
        vacations = await vacationsLogic.getAllVacationsAsync()
    }
    socketServer.sockets.emit("vacations-changed", vacations);
}


module.exports = {
    init,
    vacationsChanged
};