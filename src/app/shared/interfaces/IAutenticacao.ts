import { Auth } from "firebase/auth";

export interface IAutenticacao {
  auth: Auth;
  email: string;
  password: string;
}
