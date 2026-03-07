import { DataTableColumn } from "@/types";

export const TRANSACOES_COLUMNS: DataTableColumn[] = [
  { key: "id", label: "ID", hideOnMobile: true },
  { key: "tipoMovimentacao", label: "Tipo" },
  { key: "data", label: "Data", hideOnMobile: true },
  { key: "valor", label: "Valor", align: "right" },
  { key: "categoria", label: "Categoria", hideOnMobile: true },
  { key: "conta", label: "Conta", hideOnMobile: true },
  { key: "situacao", label: "Situação", align: "right" },
  { key: "options", label: "", style: { width: "40px" } },
];
