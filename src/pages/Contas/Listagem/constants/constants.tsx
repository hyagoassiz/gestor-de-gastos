import { IDataTableColumns } from "../../../../interfaces";

export const contasColumns: IDataTableColumns[] = [
  { key: "nome", label: "Nome" },
  { key: "tipo", label: "Tipo de Conta" },
  { key: "incluirEmSomas", align: "right", label: "Incluir em Somas" },
  { key: "options", label: "", style: { width: "40px" } },
];
