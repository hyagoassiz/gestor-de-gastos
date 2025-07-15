import { IDataTableColumns } from "../../../../../../../../interfaces";

export const productColumns: IDataTableColumns[] = [
  { key: "nome", label: "Nome" },
  { key: "quantidade", label: "Quantidade" },
  { key: "valorUnitario", label: "Preço Unitário" },
  { key: "valorTotal", label: "Total" },
  { key: "options", label: "", style: { width: "10px" } },
];
