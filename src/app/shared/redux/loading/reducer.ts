import { ILoading } from "../../interfaces";
import LoadingActionTypes from "./action-types";

const initialState: ILoading = {
  open: false,
};

interface LoadingAction {
  type: string;
}

const loadingReducer = (
  state = initialState,
  action: LoadingAction
): ILoading => {
  switch (action.type) {
    case LoadingActionTypes.HIDE:
      return {
        ...state,
        open: false,
      };
    case LoadingActionTypes.SHOW:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default loadingReducer;
