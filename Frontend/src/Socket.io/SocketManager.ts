import { VacationsActionType } from '../Redux/VacationsState';
import { io, Socket } from "socket.io-client";
import VacationModel from "../Components/VacationsArea/models/VacationModel";
import store from "../Redux/Store";
import { Globals } from '../Services/Globals';

class SocketManager {

    private socket: Socket;

    public connect(): void {
        // Connect to socket.io:
        this.socket = io(Globals.socketIoUrl);

        // with any change to the vacations state - send to clients all vacations.
        this.socket.on("vacations-changed", (vacations: VacationModel[]) => {
            store.dispatch({ type: VacationsActionType.VacationsDownloaded, payload: vacations });
        });
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}

export default SocketManager;
export const socketManagerInstance = new SocketManager();