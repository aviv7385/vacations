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

        // Listen to socket.io events:
        this.socket.on("msg-from-server-vacations-downloaded", (vacations: VacationModel)=>{
            store.dispatch({type: VacationsActionType.VacationsDownloaded, payload: vacations});
        });

        this.socket.on("msg-from-server-vacation-added", (addedVacation: VacationModel) => { 
            store.dispatch({type: VacationsActionType.VacationAdded, payload: addedVacation});
        });

        this.socket.on("msg-from-server-vacation-updated", (updatedVacation: VacationModel) => { 
            store.dispatch({type: VacationsActionType.VacationUpdated, payload: updatedVacation});
        });

        this.socket.on("msg-from-server-vacation-deleted", (id: number) => { 
            store.dispatch({type: VacationsActionType.VacationDeleted, payload: id});
        });
    }

    public disconnect() : void {
        this.socket.disconnect();
    }

}

export default SocketManager;
export const socketManagerInstance = new SocketManager();