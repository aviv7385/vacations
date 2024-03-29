
import VacationModel from "../Components/VacationsArea/models/VacationModel";

// Vacations App State (data)
export class VacationsState {
    public vacations: VacationModel[] = []; // the data in the app level
}

// Action Type (what we can do with the data)
export enum VacationsActionType {
    VacationsDownloaded = "VacationsDownloaded",
    VacationAdded = "VacationAdded",
    VacationUpdated = "VacationUpdated",
    VacationDeleted = "VacationDeleted"
}

// Action (an obj that describes the action we want to execute)
export interface VacationsAction {
    type: VacationsActionType; // the action that is being done
    payload?: any; // the data itself
}

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

