import { IDataTableColumns } from "../../../../interfaces";

export const proventosColumns: IDataTableColumns[] = [
  { key: "ativo", label: "Ativo" },
  {
    key: "totalProventosRecebidos",
    label: "Total Proventos",
  },
  {
    key: "totalQuantidadeAtual",
    label: "Quantidade",
  },
  { key: "precoMedio", label: "Preço Médio" },
  {
    key: "totalInvestido",
    label: "Total Investido",
  },
  { key: "options", label: "", style: { width: "1%" } },
];
