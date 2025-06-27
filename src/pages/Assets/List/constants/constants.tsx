import { IDataTableColumns } from "../../../../interfaces";

export const assetsColumns: IDataTableColumns[] = [
  { key: "nome", label: "Nome" },
  { key: "sigla", label: "Sigla" },
  { key: "tipo", label: "Tipo" },
  { key: "options", label: "", style: { width: "40px" } },
];
