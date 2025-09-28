import { IContaApi } from "../../../../api/Contas/interfaces/IContaApi";

export interface IModalContaState {
  open: boolean;
  conta: IContaApi | undefined;
}
