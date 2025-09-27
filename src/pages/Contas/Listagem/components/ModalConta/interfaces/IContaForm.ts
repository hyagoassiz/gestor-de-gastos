import { IContaTypeApi } from "../../../../../../api/Contas/interfaces/IContaTypeApi";

export type IContaForm = Omit<IContaPayloadApi, "tipoConta"> & {
  tipoConta: IContaTypeApi;
};
