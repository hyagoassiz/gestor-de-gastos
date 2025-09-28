import { ContaCreateAndUpdatePayload } from "@/types";
import { EnumTipoConta } from "@/types/enums";

export type IContaForm = Omit<ContaCreateAndUpdatePayload, "tipoConta"> & {
  tipoConta: keyof typeof EnumTipoConta;
};
