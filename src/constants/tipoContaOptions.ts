import { EnumTipoConta } from "@/types/enums";

export const tipoContaOptions: {
  id: keyof typeof EnumTipoConta;
  nome: string;
}[] = [
  { id: "CONTA_CORRENTE", nome: EnumTipoConta.CONTA_CORRENTE },
  { id: "INVESTIMENTO", nome: EnumTipoConta.INVESTIMENTO },
  { id: "OUTROS", nome: EnumTipoConta.OUTROS },
  { id: "POUPANCA", nome: EnumTipoConta.POUPANCA },
];
