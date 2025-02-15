import { Box } from "@mui/material";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IAreaChart {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}
export const AreaChart: React.FC<IAreaChart> = ({ data }) => {
  return (
    <Box
      sx={{
        width: "50%",
        height: "auto",
        borderRadius: "4px",
        backgroundColor: "white",
        padding: 2,
      }}
    >
      <ResponsiveContainer width="100%" height={250}>
        <RechartsAreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="patrimonio"
            stroke="#4CAF50"
            fillOpacity={1}
            fill="url(#colorSaldo)"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </Box>
  );
};
