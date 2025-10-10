import { Card, Typography, Box } from "@mui/material";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PieChartCardProps {
  data: { [key: string]: any }[];
  dataKey: string;
  nameKey: string;
  colors?: string[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  title?: string; // 👈 título opcional
}

export const PieChartCard: React.FC<PieChartCardProps> = ({
  data,
  dataKey,
  nameKey,
  colors = ["#4caf50", "#2196f3", "#ff9800", "#f44336", "#9c27b0"],
  height = 300,
  innerRadius = 0,
  outerRadius = 100,
  title,
}) => {
  return (
    <Card sx={{ p: 2, m: "16px 0", width: "30%" }}>
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
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};
