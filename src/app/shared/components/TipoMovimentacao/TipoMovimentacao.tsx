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
          color="success"
          sx={{
            height: "24px",
          }}
        />
      ) : (
        <ArrowDropDownIcon color="error" sx={{ height: "24px" }} />
      )}

      <Typography
        variant="body2"
        color={tipo === "ENTRADA" ? "success" : "error"}
        sx={{
          // color: tipo === "ENTRADA" ? "limegreen" : "crimson",
          fontWeight: 600,
        }}
      >
        {tipo === "ENTRADA" ? "Entrada" : "Saída"}
      </Typography>
    </StyledBox>
  );
};
