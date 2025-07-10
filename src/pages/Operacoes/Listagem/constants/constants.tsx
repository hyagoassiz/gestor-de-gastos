import { IDataTableColumns } from "../../../../interfaces";

export const incomeColumns: IDataTableColumns[] = [
  { key: "dataOperacao", label: "Data" },
  { key: "ativo", label: "Ativo" },
  { key: "tipoOperacao", label: "Tipo" },
  { key: "quantidade", label: "Quantidade" },
  { key: "valorUnitario", label: "Valor Unitário" },
  { key: "valorTotal", label: "Valor Total" },
  { key: "options", label: "", style: { width: "40px" } },
];
