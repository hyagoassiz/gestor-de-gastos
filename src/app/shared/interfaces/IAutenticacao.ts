import { Auth } from "firebase/auth";

export interface IAutenticacao {
  auth: Auth;
  displayName?: string;
  email: string;
  password: string;
}
