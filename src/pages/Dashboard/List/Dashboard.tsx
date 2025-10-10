import { Card } from "@/components/Card";
import { PageTitle } from "../../../components/PageTitle";
import { Stack } from "@mui/material";
import dayjs from "dayjs";
import { BarChartCard } from "@/components/BarChartCard";
import { PieChartCard } from "@/components/PieChartCard";

export const Dashboard: React.FC = () => {
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

  const receitasPorCategoria = [
    { categoria: "Salário", valor: 5000 },
    { categoria: "Investimentos", valor: 1200 },
    { categoria: "Freelance", valor: 800 },
  ];

  const despesasPorCategoria = [
    { categoria: "Aluguel", valor: 1500 },
    { categoria: "Alimentação", valor: 800 },
    { categoria: "Transporte", valor: 300 },
    { categoria: "Lazer", valor: 200 },
  ];

  return (
    <>
      <PageTitle
        title="Dashboard"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
      />

      <Stack direction="row" spacing={2}>
        <Card title={300} subTitle="Entradas" />
        <Card title={300} subTitle="Saídas" />
        <Card title={300} subTitle="Saldo" />
        <Card title={300} subTitle="À Receber" />
        <Card title={300} subTitle="À Pagar" />
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
