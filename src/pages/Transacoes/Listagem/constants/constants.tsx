import { IDataTableColumns } from "../../../../interfaces";

export const TRANSACOES_COLUMNS: IDataTableColumns[] = [
  { key: "id", label: "ID" },
  { key: "tipoMovimentacao", label: "Tipo" },
  { key: "data", label: "Data" },
  { key: "valor", label: "Valor", align: "right" },
  { key: "categoria", label: "Categoria" },
  { key: "conta", label: "Conta" },
  { key: "situacao", label: "Situação", align: "right" },
  { key: "options", label: "", style: { width: "40px" } },
];
