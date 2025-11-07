import { DataTableColumn } from "@/types";

export const CONTAS_COLUMNS: DataTableColumn[] = [
  { key: "id", label: "ID" },
  { key: "conta", label: "Conta" },
  { key: "saldo", label: "Saldo", align: "right" },
  { key: "options", label: "", align: "right" },
];
