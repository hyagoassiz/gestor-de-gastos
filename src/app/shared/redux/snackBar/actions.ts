import { ISnackBar } from "../../interfaces";
import SnackBarActionTypes from "./action-types";

export const showSnackbar = (message: string, type: ISnackBar["type"]) => ({
  type: SnackBarActionTypes.SHOW,
  payload: { message, type },
});

export const closeSnackbar = () => ({
  type: SnackBarActionTypes.HIDE,
});
