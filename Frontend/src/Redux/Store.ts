import { combineReducers, createStore } from "redux";
import { VacationsReducer } from "./VacationsState";
import { UserReducer } from "./UserState";
import {FollowsReducer} from "./FollowsState";

//const store = createStore(VacationsReducer);
//const store = createStore(UserReducer);

//for multiple reducers:
const reducers = combineReducers({ VacationsReducer, UserReducer, FollowsReducer });
const store = createStore(reducers);

export default store;