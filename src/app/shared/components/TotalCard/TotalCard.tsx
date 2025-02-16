import { Box, Stack, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { BoxContainer, StyledBox } from "./styles";
import { ReactNode } from "react";

interface ITotalCard {
  title: string;
  icon: ReactNode;
  total: number;
}
export const TotalCard: React.FC<ITotalCard> = ({ title, icon, total }) => {
  return (
    <BoxContainer>
      <Box padding={2}>
        <Typography color="info" sx={{ fontSize: "14px", fontWeight: 500 }}>
          {title}
        </Typography>

        <Stack
          mt={2}
          display="flex"
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <StyledBox>{icon}</StyledBox>
          <Typography
            color="textPrimary"
            sx={{ fontSize: "20px", fontWeight: "bold" }}
          >
            <NumericFormat
              value={total}
              prefix={"R$ "}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator=","
              thousandSeparator={"."}
              displayType="text"
            />
          </Typography>
        </Stack>
      </Box>
    </BoxContainer>
  );
};
