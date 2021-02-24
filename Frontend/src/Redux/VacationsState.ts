
import VacationModel from "../Components/VacationsArea/models/VacationModel";

// Vacations App State (data)
export class VacationsState {
    public vacations: VacationModel[] = []; // the data in the app level
}

// Action Type (what we can do with the data)
export enum VacationsActionType {
    VacationsDownloaded,
    VacationAdded,
    VacationUpdated,
    VacationDeleted
}

// Action (an obj that describes the action we want to execute)
export interface VacationsAction {
    type: VacationsActionType; // the action that is being done
    payload?: any; // the data itself
}

// // Vacations Actions Creators:
// export function vacationsDownloadedAction(vacations: VacationModel[]): VacationsAction {
//     return (type: VacationsActionType.VacationsDownloaded, payload: vacations);
// }
// export function vacationAddedAction(vacation: VacationModel): VacationsAction {
//     return (type: VacationsActionType.VacationAdded, payload: vacation);
// }
// export function VacationUpdatedAction(vacation: VacationModel): VacationsAction {
//     return (type: VacationsActionType.VacationUpdated, payload: vacation);
// }

// Vacations Reducer - a function that is is being called by Redux to execute the action, and returns the new state 
export function VacationsReducer(currentState: VacationsState = new VacationsState(), action: VacationsAction): VacationsState {
    const newState = { ...currentState } // Duplicate currentState into a newState.

    switch (action.type) {
        case VacationsActionType.VacationsDownloaded:
            newState.vacations = action.payload; // payload = all vacations
            break;
        case VacationsActionType.VacationAdded:
            newState.vacations.push(action.payload); // payload = the added vacation
            break;
        case VacationsActionType.VacationUpdated:
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            newState.vacations[indexToUpdate] = action.payload; // payload = the updated vacation
            break;
        case VacationsActionType.VacationDeleted:
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            newState.vacations.splice(indexToDelete, 1); // payload = the deleted vacation
            break;
    }

    return newState;
}

