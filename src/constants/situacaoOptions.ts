import { EnumSituacao } from "@/types/enums";

export const situacaoOptions: {
  id: keyof typeof EnumSituacao;
  nome: string;
}[] = [
  { id: "PAGO", nome: EnumSituacao.PAGO },
  { id: "NAO_PAGO", nome: EnumSituacao.NAO_PAGO },
  { id: "RECEBIDO", nome: EnumSituacao.RECEBIDO },
  { id: "NAO_RECEBIDO", nome: EnumSituacao.NAO_RECEBIDO },
];
