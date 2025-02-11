import { Stack } from "@mui/material";
import { TotalCard } from "../../../../../shared/components/TotalCard";

export const Totais: React.FC = () => {
  return (
    <Stack direction="row" spacing={2}>
      <TotalCard title="Saldo" total={500} />
      <TotalCard title="Entradas" total={1000} />
      <TotalCard title="Saídas" total={500} />
    </Stack>
  );
};
