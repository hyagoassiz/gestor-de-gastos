import { Typography } from "@mui/material";
import { TypeTransacao } from "../../interfaces";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { StyledBox } from "./styles";

interface ITipoMovimentacao {
  tipo: TypeTransacao;
}

export const TipoMovimentacao: React.FC<ITipoMovimentacao> = ({ tipo }) => {
  return (
    <StyledBox>
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
        sx={{
          color: tipo === "ENTRADA" ? "limegreen" : "crimson",
          fontWeight: 600,
        }}
      >
        {tipo === "ENTRADA" ? "Entrada" : "Saída"}
      </Typography>
    </StyledBox>
  );
};
