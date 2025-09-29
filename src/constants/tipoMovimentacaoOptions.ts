import { EnumTipoMovimentacao } from "@/types/enums";

export const tipoMovimentacaoOptions: {
  id: keyof typeof EnumTipoMovimentacao;
  nome: string;
}[] = [
  { id: "ENTRADA", nome: EnumTipoMovimentacao.ENTRADA },
  { id: "SAIDA", nome: EnumTipoMovimentacao.SAIDA },
];
