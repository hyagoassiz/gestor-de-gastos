import { User } from "firebase/auth";
import { ILoading } from "./ILoading";
import { ISnackBar } from "./ISnackBar";

export interface IRootState {
  user: User;
  snackBar: ISnackBar;
  loading: ILoading;
}
