import { ModalAjustarSaldoState } from "../../../types";

export type AjustarSaldoForm = Pick<
  ModalAjustarSaldoState,
  "conta" | "valorAtual"
>;
