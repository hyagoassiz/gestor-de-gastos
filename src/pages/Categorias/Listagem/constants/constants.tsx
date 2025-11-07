import { DataTableColumn } from "@/types";

export const categoriasColumns: DataTableColumn[] = [
  { key: "id", label: "ID" },
  { key: "nome", label: "Nome" },
  { key: "tipoMovimentacao", label: "Tipo" },
  { key: "options", label: "", style: { width: "40px" } },
];
