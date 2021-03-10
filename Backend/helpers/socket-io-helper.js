const io = require("socket.io");
const vacationsLogic = require("../business-logic-layer/vacations-logic");
const followsLogic = require ("../business-logic-layer/follows-logic");

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

async function vacationsChanged(vacations) {
    if(typeof vacations == "undefined") {
        vacations = await vacationsLogic.getAllVacationsAsync()
    }
    
    socketServer.sockets.emit("vacations-changed", vacations);
    console.log("emit changed");
}


//  function vacationsDownloaded(vacations) {
//      console.log("emit downloaded");
//      socketServer.sockets.emit("msg-from-server-vacations-downloaded", vacations);
//  }

// function vacationAdded(addedVacation) {
//     console.log("emit added");
//     socketServer.sockets.emit("msg-from-server-vacation-added", addedVacation);
// }

// function vacationUpdated(updatedVacation) {
//     console.log("emit updated");
//     socketServer.sockets.emit("msg-from-server-vacation-updated", updatedVacation);
// }

// function vacationDeleted(id) {
//     console.log("emit deleted");
//     socketServer.sockets.emit("msg-from-server-vacation-deleted", id);
// }

module.exports = {
    init,
    vacationsChanged
    //vacationsDownloaded
    // vacationAdded,
    // vacationUpdated,
    // vacationDeleted
};