import { ISnackBar } from "../../interfaces/ISnackBar";
import SnackBarActionTypes from "./action-types";

const initialState: ISnackBar = {
  message: "",
  type: "success",
  open: false,
};

interface SnackBarAction {
  type: string;
  payload?: {
    message: string;
    type: ISnackBar["type"];
  };
}

const snackBarReducer = (
  state = initialState,
  action: SnackBarAction
): ISnackBar => {
  switch (action.type) {
    case SnackBarActionTypes.HIDE:
      return {
        ...state,
        open: false,
      };
    case SnackBarActionTypes.SHOW:
      return {
        ...state,
        ...action.payload,
        open: true,
      };
    default:
      return state;
  }
};

export default snackBarReducer;
