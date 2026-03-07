import { Box, Stack } from "@mui/material";
import { BarChartCard } from "@/components/BarChartCard";
import { HorizontalBarChartCard } from "@/components/HorizontalBarChartCard";
import { Totalizador } from "@/components/Totalizador";
import { useListagem } from "./hooks/useListagem";
import { PageHeader } from "@/components/PageHeader";

export const Listagem: React.FC = () => {
  const listagem = useListagem();

  return (
    <>
      <PageHeader title="Dashboard" />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Totalizador
          value={listagem.totais?.entradas ?? 0}
          subTitle="Entradas"
        />
        <Totalizador value={listagem.totais?.saidas ?? 0} subTitle="Saídas" />
        <Totalizador value={listagem.totais?.saldo ?? 0} subTitle="Saldo" />
        <Totalizador
          value={listagem.totais?.aReceber ?? 0}
          subTitle="À Receber"
        />
        <Totalizador value={listagem.totais?.aPagar ?? 0} subTitle="À Pagar" />
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} m="16px 0px">
        <Box flex={1}>
          <BarChartCard
            title="Entradas e Saídas por mês"
            data={listagem.transacoesMensais ?? []}
            xDataKey="mesAno"
            bars={[
              { dataKey: "totalEntradas", fill: "#4caf50", name: "Entradas" },
              { dataKey: "totalSaidas", fill: "#f44336", name: "Saídas" },
            ]}
            height={300}
          />
        </Box>

        <Box flex={1}>
          <HorizontalBarChartCard
            data={listagem.despesasPorCategoria ?? []}
            dataKey="total"
            nameKey="categoria"
            title="Despesas por Categoria"
            height={300}
          />
        </Box>
      </Stack>
    </>
  );
};
