import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import eventsReducer from "./eventsReducer";

const rootReducer = combineReducers({
    eventsReducer,
    errorReducer
}) 

export default rootReducer;

