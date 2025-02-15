import { Box, Typography } from "@mui/material";
import {
  Bar,
  BarChart as RechartsBarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IBarChart {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}
export const BarChart: React.FC<IBarChart> = ({ data }) => {
  return (
    <Box mt={2} bgcolor="white" padding={2} borderRadius="4px" width="50%">
      <Typography variant="h6" align="center" gutterBottom>
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
    </Box>
  );
};
