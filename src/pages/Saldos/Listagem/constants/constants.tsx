import { IDataTableColumns } from "../../../../interfaces";

export const CONTAS_COLUMNS: IDataTableColumns[] = [
  { key: "id", label: "ID" },
  { key: "conta", label: "Conta" },
  { key: "saldo", label: "Saldo", align: "right" },
];
