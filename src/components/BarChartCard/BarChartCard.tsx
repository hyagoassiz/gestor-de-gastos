import { Card, Typography, Box } from "@mui/material";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BarChartCardProps {
  data: { [key: string]: any }[];
  xDataKey: string;
  bars: { dataKey: string; fill: string; name: string }[];
  height?: number;
  title?: string;
}

export const BarChartCard: React.FC<BarChartCardProps> = ({
  data,
  xDataKey,
  bars,
  height = 300,
  title,
}) => {
  return (
    <Card sx={{ p: 2, m: "16px 0", width: "70%" }}>
      {title && (
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 600, textAlign: "center" }}
        >
          {title}
        </Typography>
      )}

      <Box sx={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey={xDataKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            {bars.map((bar) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                fill={bar.fill}
                name={bar.name}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};
