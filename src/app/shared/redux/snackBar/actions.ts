import SnackBarActionTypes from "./action-types";

export const showSnackbar = (message: string, type = "success") => ({
  type: SnackBarActionTypes.SHOW,
  payload: { message, type },
});

export const closeSnackbar = () => ({
  type: SnackBarActionTypes.HIDE,
});
