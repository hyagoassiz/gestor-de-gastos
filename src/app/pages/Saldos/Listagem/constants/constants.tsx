import { IDataColumns } from "../../../../shared/interfaces";

export const saldosColumns: IDataColumns[] = [
  { key: "conta", label: "Conta" },
  { key: "entradas", label: "Entradas" },
  { key: "saidas", label: "Saídas" },
  { key: "saldoAtual", label: "Saldo Atual" },
  { key: "options", label: "", style: { width: "10px" } },
];
