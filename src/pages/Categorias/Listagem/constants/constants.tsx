import { IDataTableColumns } from "../../../../interfaces";

export const categoriasColumns: IDataTableColumns[] = [
  { key: "id", label: "ID" },
  { key: "nome", label: "Nome" },
  { key: "tipoMovimentacao", label: "Tipo" },
  { key: "options", label: "", style: { width: "40px" } },
];
