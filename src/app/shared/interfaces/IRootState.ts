import { ILoading } from "./ILoading";
import { ISnackBar } from "./ISnackBar";
import { IUsuario } from "./IUsuario";

export interface IRootState {
  user: IUsuario;
  snackBar: ISnackBar;
  loading: ILoading;
}
