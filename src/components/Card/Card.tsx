import { Box, Card as MuiCard, CardContent, Typography } from "@mui/material";
import { ReactNode } from "react";

interface ICardProps {
  title: string | number | ReactNode;
  subTitle: string | number;
}

export const Card: React.FC<ICardProps> = ({ title, subTitle }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 2,
      }}
    >
      <MuiCard>
        <CardContent sx={{ height: "100%" }}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subTitle}
          </Typography>
        </CardContent>
      </MuiCard>
    </Box>
  );
};
