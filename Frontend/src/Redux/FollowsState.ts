import FollowsModel from "../Components/VacationsArea/models/FollowsModel";

export class FollowsState {
    public followedVacations: FollowsModel[] = []; // the data in the app level
}

// Action Type (what we can do with the data)
export enum FollowsActionType {
    FollowsDownloaded = "FollowsDownloaded",
    FollowAdded = "FollowAdded",
    FollowsTotalCount = "FollowsTotalCount",
    FollowDeleted = "FollowDeleted"
}

// Action (an obj that describes the action we want to execute)
export interface FollowsAction {
    type: FollowsActionType; // the action that is being done
    payload?: any; // the data itself
}

// a function that is is being called by Redux to execute the action, and returns the new state 
export function FollowsReducer(currentState: FollowsState = new FollowsState(), action: FollowsAction): FollowsState {
    const newState = { ...currentState } // Duplicate currentState into a newState.

    switch (action.type) {
        case FollowsActionType.FollowsDownloaded:
            newState.followedVacations = action.payload; // payload = all followed vacations 
            break;
        case FollowsActionType.FollowAdded:
            newState.followedVacations.push(action.payload); // payload - the added follow
            break;
        case FollowsActionType.FollowDeleted:
            const indexToDelete = newState.followedVacations.findIndex(f => f.vacationId === action.payload); // payload = the removed follow
            newState.followedVacations.splice(indexToDelete, 1);
            break;
    }
    return newState;
}