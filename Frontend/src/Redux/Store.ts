import { combineReducers, createStore } from "redux";
import { VacationsReducer } from "./VacationsState";

const store = createStore(VacationsReducer);

// for multiple reducers:
//const reducers = combineReducers({VacationsReducer});
//const store = createStore(reducers);

export default store;