import { Card, Typography, Box } from "@mui/material";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface HorizontalBarChartCardProps {
  data: { [key: string]: any }[];
  dataKey: string; // valor da barra
  nameKey: string; // nome da categoria
  colors?: string[];
  height?: number;
  title?: string;
}

export const HorizontalBarChartCard: React.FC<HorizontalBarChartCardProps> = ({
  data,
  dataKey,
  nameKey,
  colors = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0"],
  height = 400,
  title,
}) => {
  return (
    <Card sx={{ p: 2, m: "16px 0", width: "50%" }}>
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
          <BarChart
            data={data}
            layout="vertical" // horizontal bars
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey={nameKey}
              width={150} // largura do eixo Y
            />
            <Tooltip />
            <Bar dataKey={dataKey} fill={colors[0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};
