import { EnumTipoMotimentacaoApi } from "../api/interfaces";

export const tipoMovimentacaoOptions: {
  id: keyof typeof EnumTipoMotimentacaoApi;
  nome: string;
}[] = [
  { id: "ENTRADA", nome: EnumTipoMotimentacaoApi.ENTRADA },
  { id: "SAIDA", nome: EnumTipoMotimentacaoApi.SAIDA },
];
