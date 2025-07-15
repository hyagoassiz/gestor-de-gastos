import { IDataTableColumns } from "../../../../interfaces";

export const proventosColumns: IDataTableColumns[] = [
  { key: "dataPagamento", label: "Data de Recebimento" },
  { key: "ativo", label: "Ativo" },
  { key: "tipoProvento", label: "Tipo" },
  { key: "quantidade", label: "Quantidade" },
  { key: "precoUnitario", label: "Preço Unitário" },
  { key: "total", label: "Total" },
  { key: "options", label: "", style: { width: "40px" } },
];
