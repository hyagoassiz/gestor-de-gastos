import { EnumTipoConta } from "@/types/enums";

export const tipoContaOptions: {
  id: keyof typeof EnumTipoConta;
  nome: string;
}[] = [
  { id: "CONTA_CORRENTE", nome: EnumTipoConta.CONTA_CORRENTE },
  { id: "DINHEIRO", nome: EnumTipoConta.DINHEIRO },
  { id: "INVESTIMENTO", nome: EnumTipoConta.INVESTIMENTO },
  { id: "POUPANCA", nome: EnumTipoConta.POUPANCA },
  { id: "VR_VA", nome: EnumTipoConta.VR_VA },
  { id: "OUTROS", nome: EnumTipoConta.OUTROS },
];
