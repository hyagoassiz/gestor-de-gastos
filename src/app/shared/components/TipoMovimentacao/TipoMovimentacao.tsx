import { Box, Typography } from "@mui/material";
import { TypeCategoria } from "../../interfaces";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

interface ITipoMovimentacao {
  tipo: TypeCategoria;
}

export const TipoMovimentacao: React.FC<ITipoMovimentacao> = ({ tipo }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "90px",
        borderRadius: "10px",
        border: `1px solid ${tipo === "ENTRADA" ? "limegreen" : "crimson"}`,
      }}
    >
      {tipo === "ENTRADA" ? (
        <ArrowDropUpIcon
          sx={{
            color: "limegreen",
            height: "24px",
          }}
        />
      ) : (
        <ArrowDropDownIcon sx={{ color: "crimson", height: "24px" }} />
      )}

      <Typography
        variant="body2"
        sx={{ color: tipo === "ENTRADA" ? "limegreen" : "crimson" }}
      >
        {tipo === "ENTRADA" ? "Entrada" : "Saída"}
      </Typography>
    </Box>
  );
};
