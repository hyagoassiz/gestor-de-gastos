import { IDataColumns } from "../../../../shared/interfaces";

export const transacoesColumns: IDataColumns[] = [
  { key: "data", label: "Data" },
  { key: "tipo", label: "Tipo" },
  { key: "categoria", label: "Categoria" },
  { key: "conta", label: "Conta" },
  { key: "valor", label: "Valor" },
  { key: "situacao", label: "Situação" },
  { key: "observacao", label: "Observação" },
  { key: "options", label: "", style: { width: "10px" } },
];
