import { situacaoOptions } from "@/constants/situacaoOptions";
import { EnumSituacao, EnumTipoMovimentacao } from "@/types/enums";

export function filtrarSituacaoOptions(
  tipoMovimentacao: keyof typeof EnumTipoMovimentacao
): {
  id: keyof typeof EnumSituacao;
  nome: string;
}[] {
  if (tipoMovimentacao === "ENTRADA") {
    return situacaoOptions.filter(
      (item) => item.id === "RECEBIDO" || item.id === "NAO_RECEBIDO"
    );
  }

  if (tipoMovimentacao === "SAIDA") {
    return situacaoOptions.filter(
      (item) => item.id === "PAGO" || item.id === "NAO_PAGO"
    );
  }

  return [];
}
