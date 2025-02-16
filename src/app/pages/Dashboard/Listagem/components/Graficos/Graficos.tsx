import {} from "recharts";
import { Stack } from "@mui/material";
import { AreaChart } from "../../../../../shared/components/AreaChart";
import { BarChart } from "../../../../../shared/components/BarChart/BarChart";
import useGraficos from "./hooks/useGraficos";

export const Graficos: React.FC = () => {
  const { data, data2 } = useGraficos();

  return (
    <>
      <Stack direction="row" spacing={2} mt={2}>
        {data2.length > 0 && <AreaChart data={data2} />}
        {data.length > 0 && <BarChart data={data} />}
      </Stack>
    </>
  );
};
