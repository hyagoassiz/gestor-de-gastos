import { Typography } from "@mui/material";
import {
  Bar,
  BarChart as RechartsBarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BoxContainer } from "./styles";

interface IBarChart {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}
export const BarChart: React.FC<IBarChart> = ({ data }) => {
  return (
    <BoxContainer>
      <Typography
        color="textPrimary"
        gutterBottom
        mb={2}
        sx={{ fontSize: "18px" }}
      >
        Entradas e Saídas
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <RechartsBarChart data={[...data]} barGap={0}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="entradas" fill="#4CAF50" name="Entradas" />
          <Bar dataKey="saidas" fill="#F44336" name="Saídas" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </BoxContainer>
  );
};
