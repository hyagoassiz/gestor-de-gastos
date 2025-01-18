import { User } from "firebase/auth";
import userActionTypes from "./action-types";

export const adicionarUserData = (data: User) => ({
  type: userActionTypes.ADD,
  payload: data,
});

export const removerUserData = () => ({
  type: userActionTypes.REMOVE,
});
