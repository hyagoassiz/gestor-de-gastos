import { Stack } from "@mui/material";
import { TotalCard } from "../../../../../shared/components/TotalCard";
import useTotais from "./hooks/useTotais";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export const Totais: React.FC = () => {
  const { totalizador } = useTotais();

  return (
    <Stack direction="row" spacing={2}>
      <TotalCard
        title="Saldo"
        total={totalizador.concluido.saldo}
        icon={<AttachMoneyIcon color="inherit" />}
      />
      <TotalCard
        title="Entradas"
        total={totalizador.concluido.entradas}
        icon={<ArrowUpwardIcon color="inherit" />}
      />
      <TotalCard
        title="Saídas"
        total={totalizador.concluido.saidas}
        icon={<ArrowDownwardIcon color="inherit" />}
      />
    </Stack>
  );
};
