import { PageTitle } from "../../../components/PageTitle";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import { BarChartCard } from "@/components/BarChartCard";
import { PieChartCard } from "@/components/PieChartCard";
import { Totalizador } from "@/components/Totalizador";
import { useListagem } from "./hooks/useListagem";

export const Listagem: React.FC = () => {
  const listagem = useListagem();

  const data = [
    {
      mes: dayjs("2025-10-01").format("DD/MM/YYYY"),
      entradas: 300,
      saidas: 200,
    },
    {
      mes: dayjs("2025-10-02").format("DD/MM/YYYY"),
      entradas: 500,
      saidas: 100,
    },
    {
      mes: dayjs("2025-10-03").format("DD/MM/YYYY"),
      entradas: 200,
      saidas: 150,
    },
  ];

  const despesasPorCategoria = [
    { categoria: "Aluguel", valor: 1500 },
    { categoria: "Alimentação", valor: 800 },
    { categoria: "Transporte", valor: 300 },
    { categoria: "Lazer", valor: 200 },
  ];

  return (
    <>
      <PageTitle title="Dashboard" subTitle="Resumo" />

      <Stack direction="row" spacing={2}>
        <Totalizador
          value={listagem.resumo?.entradas ?? 0}
          subTitle="Entradas"
        />
        <Totalizador value={listagem.resumo?.saidas ?? 0} subTitle="Saídas" />
        <Totalizador value={listagem.resumo?.saldo ?? 0} subTitle="Saldo" />
        <Totalizador
          value={listagem.resumo?.aReceber ?? 0}
          subTitle="Receber"
        />
        <Totalizador value={listagem.resumo?.aPagar ?? 0} subTitle="À Pagar" />
      </Stack>

      <Stack direction="row" spacing={2} m="16px 0px">
        <BarChartCard
          title="Entradas e Saídas por mês"
          data={data}
          xDataKey="mes"
          bars={[
            { dataKey: "entradas", fill: "#4caf50", name: "Entradas" },
            { dataKey: "saidas", fill: "#f44336", name: "Saídas" },
          ]}
          height={400}
        />

        <PieChartCard
          title="Despesas por categoria"
          data={despesasPorCategoria}
          dataKey="valor"
          nameKey="categoria"
          height={400}
          outerRadius={100}
        />
      </Stack>
    </>
  );
};
