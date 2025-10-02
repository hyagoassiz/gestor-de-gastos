import { EnumTipoMovimentacao } from "@/types/enums";

export function getSituacaoTransacao(
  tipoMovimentacao: keyof typeof EnumTipoMovimentacao,
  pago: boolean
): string {
  if (tipoMovimentacao === "ENTRADA") {
    if (pago) {
      return "Recebido";
    }
    return "Não Recebido";
  }

  if (pago) {
    return "Pago";
  }

  return "Não Pago";
}
