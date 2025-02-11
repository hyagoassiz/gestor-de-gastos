import { Box, Stack, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { NumericFormat } from "react-number-format";

interface ITotalCard {
  title: string;
  total: number;
}
export const TotalCard: React.FC<ITotalCard> = ({ title, total }) => {
  return (
    <Box
      sx={{
        width: "300px",
        height: "150px",
        borderRadius: "4px",
        gap: 2,
        backgroundColor: "white",
      }}
    >
      <Box padding={2}>
        <Typography sx={{ fontWeight: 600 }}>{title}</Typography>

        <Stack
          mt={2}
          display="flex"
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <Box
            sx={{
              backgroundColor: "#D3D3D3",
              width: 48,
              height: 48,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
            }}
          >
            <AttachMoneyIcon />
          </Box>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
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
    </Box>
  );
};
