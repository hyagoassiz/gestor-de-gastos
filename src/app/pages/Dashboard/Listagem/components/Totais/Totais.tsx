import { Stack } from "@mui/material";
import { TotalCard } from "../../../../../shared/components/TotalCard";
import useTotais from "./hooks/useTotais";

export const Totais: React.FC = () => {
  const { totalizador } = useTotais();
  return (
    <Stack direction="row" spacing={2}>
      <TotalCard title="Saldo" total={totalizador.concluido.saldo} />
      <TotalCard title="Entradas" total={totalizador.concluido.entradas} />
      <TotalCard title="Saídas" total={totalizador.concluido.saidas} />
    </Stack>
  );
};
