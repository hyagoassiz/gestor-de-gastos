import { IDataTableColumns } from "../../../../interfaces";

export const proventosColumns: IDataTableColumns[] = [
  { key: "dataOperacao", label: "Data", style: { width: "16,5%" } },
  { key: "ativo", label: "Ativo", style: { width: "16,5%" } },
  { key: "tipoOperacao", label: "Tipo", style: { width: "16,5%" } },
  { key: "quantidade", label: "Quantidade", style: { width: "16,5%" } },
  { key: "precoUnitario", label: "Preço Unitário", style: { width: "16,5%" } },
  { key: "total", label: "Total", style: { width: "16,5%" } },
  { key: "options", label: "", style: { width: "1%" } },
];
