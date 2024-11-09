import { combineReducers } from "redux";
import snackBarReducer from "./snackBar/reducer";

const rootReducer = combineReducers({
  snackBar: snackBarReducer,
});

export default rootReducer;
