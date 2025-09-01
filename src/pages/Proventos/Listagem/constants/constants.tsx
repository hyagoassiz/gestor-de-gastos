import { IDataTableColumns } from "../../../../interfaces";

export const proventosColumns: IDataTableColumns[] = [
  { key: "dataPagamento", label: "Data de Pagamento" },
  { key: "ativo", label: "Ativo" },
  { key: "tipoProvento", label: "Tipo" },
  { key: "total", label: "Total" },
  { key: "options", label: "", style: { width: "40px" } },
];
