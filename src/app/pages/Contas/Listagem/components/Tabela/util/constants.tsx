import { IDataColumns } from "../../../../../../shared/interfaces";

export const DataColumns: IDataColumns[] = [
  { key: "nome", label: "Nome" },
  { key: "tipoConta", label: "Tipo de Conta" },
  { key: "incluirSoma", label: "Incluir em Somas" },
  { key: "situacao", label: "Situação" },
  { key: "options", label: "", style: { width: "10px" } },
];
