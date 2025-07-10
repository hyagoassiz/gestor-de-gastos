import { IDataTableColumns } from "../../../../interfaces";

export const incomeColumns: IDataTableColumns[] = [
  { key: "dataPagamento", label: "Data de Recebimento" },
  { key: "ativo", label: "Ativo" },
  { key: "tipoProvento", label: "Tipo" },
  { key: "total", label: "Valor Total" },
  { key: "options", label: "", style: { width: "40px" } },
];
