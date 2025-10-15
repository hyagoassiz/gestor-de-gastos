import { ContaCreateAndUpdatePayload } from "@/types";
import { EnumTipoConta } from "@/types/enums";

export type ContaForm = Omit<ContaCreateAndUpdatePayload, "tipoConta"> & {
  tipoConta: keyof typeof EnumTipoConta;
};
