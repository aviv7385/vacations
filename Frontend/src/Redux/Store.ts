import { combineReducers, createStore } from "redux";
import { VacationsReducer } from "./VacationsState";
import { UserReducer } from "./UserState";

//const store = createStore(VacationsReducer);
const store = createStore(UserReducer);

// //for multiple reducers:
// const reducers = combineReducers({ VacationsReducer, UserReducer });
// const store = createStore(reducers);

export default store;