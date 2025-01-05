import { IUsuario } from "../../interfaces";
import userActionTypes from "./action-types";

const initialState: IUsuario = {
  uid: "",
  displayName: "",
  email: "",
  emailVerified: false,
};

interface UserAction {
  type: string;
  payload?: IUsuario;
}

const userReducer = (state = initialState, action: UserAction): IUsuario => {
  switch (action.type) {
    case userActionTypes.REMOVE:
      return {
        ...initialState,
      };
    case userActionTypes.ADD:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
