import { IDataTableColumns } from "../../../../interfaces";

export const incomeColumns: IDataTableColumns[] = [
  { key: "dataRecebimento", label: "Data de Recebimento" },
  { key: "ativo", label: "Ativo" },
  { key: "tipoProvento", label: "Tipo" },
  { key: "valor", label: "Valor" },
  { key: "options", label: "", style: { width: "40px" } },
];
