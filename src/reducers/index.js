import { combineReducers } from "redux";
import phrasebookReducer from "./phrasebookReducer";
import userReducer from "./userReducer";

export default combineReducers({
  phrasebooks: phrasebookReducer,
  user: userReducer
});
