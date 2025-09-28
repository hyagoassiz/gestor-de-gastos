import { EnumTipoContaApi } from "../api/Contas/interfaces/EnumTipoContaApi";

export const tipoContaOptions: {
  id: keyof typeof EnumTipoContaApi;
  nome: string;
}[] = [
  { id: "CONTA_CORRENTE", nome: EnumTipoContaApi.CONTA_CORRENTE },
  { id: "INVESTIMENTO", nome: EnumTipoContaApi.INVESTIMENTO },
  { id: "OUTROS", nome: EnumTipoContaApi.OUTROS },
  { id: "POUPANCA", nome: EnumTipoContaApi.POUPANCA },
];
