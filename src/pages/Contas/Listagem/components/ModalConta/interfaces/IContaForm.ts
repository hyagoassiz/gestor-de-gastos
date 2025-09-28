import { EnumTipoContaApi } from "../../../../../../api/Contas/interfaces/EnumTipoContaApi";
import { IContaPayloadApi } from "../../../../../../api/Contas/interfaces/IContaPayloadApi";

export type IContaForm = Omit<IContaPayloadApi, "tipoConta"> & {
  tipoConta: keyof typeof EnumTipoContaApi;
};
