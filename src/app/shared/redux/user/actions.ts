import { IUsuario } from "../../interfaces";
import userActionTypes from "./action-types";

export const adicionarUserData = (data: IUsuario) => ({
  type: userActionTypes.ADD,
  payload: data,
});

export const removerUserData = () => ({
  type: userActionTypes.REMOVE,
});
