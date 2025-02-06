import { IDataColumns } from "../../../../shared/interfaces";
import { ITransacaoForm } from "../interfaces";

export const transacoesColumns: IDataColumns[] = [
  { key: "data", label: "Data" },
  { key: "tipo", label: "Tipo" },
  { key: "categoria", label: "Categoria" },
  { key: "conta", label: "Conta" },
  { key: "valor", label: "Valor" },
  { key: "situacao", label: "Situação" },
  { key: "options", label: "", style: { width: "10px" } },
];

export const initialTransacaoForm: ITransacaoForm = {
  id: undefined,
  concluido: true,
  data: "",
  idCategoria: "",
  idConta: "",
  tipo: "" as ITransacaoForm["tipo"],
  valor: 0,
  observacao: "",
};
