import UserModel from "../Components/UsersArea/models/UserModel";


// Vacations App State (data)
export class UserState {
    public user: UserModel; // the data in the app level

    // get the user object from session storage 
    // public constructor() {
    //     const user = JSON.parse(sessionStorage.getItem("user"));
    //     if (user) {
    //         this.user = user;
    //     }
    // }
}

// Action Type (what we can do with the data)
export enum UserActionType {
    UserRegistered,
    UserLoggedIn
}

// Action (an obj that describes the action we want to execute)
export interface UserAction {
    type: UserActionType; // the action that is being done
    payload?: any; // the data itself
}

// User Reducer - a function that is is being called by Redux to execute the action, and returns the new state 
export function UserReducer(currentState: UserState = new UserState(), action: UserAction): UserState {
    const newState = { ...currentState } // Duplicate currentState into a newState.

    switch (action.type) {
        case UserActionType.UserRegistered:
            newState.user = action.payload; // payload = the new user
            break;
        case UserActionType.UserLoggedIn:
            newState.user = action.payload; // payload = the logged-in user
            break;
    }

    // save the user object to session storage
    //sessionStorage.setItem("user", JSON.stringify(newState.user));

    return newState;
}

