import { IDataColumns } from "../../../../shared/interfaces";

export const contasColumns: IDataColumns[] = [
  { key: "nome", label: "Nome" },
  { key: "tipoConta", label: "Tipo de Conta" },
  { key: "incluirSoma", label: "Incluir em Somas" },
  { key: "observacao", label: "Observação", align: "center" },
  { key: "options", label: "", style: { width: "10px" } },
];
