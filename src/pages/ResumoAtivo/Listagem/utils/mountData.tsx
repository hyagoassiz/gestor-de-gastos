import { ListItemText, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";

interface IMountDataProps {
  resumos: IResumoAtivo[] | undefined;
}

export function mountData({ resumos }: IMountDataProps): any[] {
  if (resumos?.length) {
    return resumos.map((resumo) => ({
      ...resumo,
      id: resumo.ativo.id,
      ativo: (
        <ListItemText
          primary={resumo?.ativo?.sigla ?? "Ativo não encontrado"}
          secondary={resumo?.ativo?.nome ?? "-"}
          primaryTypographyProps={{ fontSize: "14px" }}
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      ),
      totalProventosRecebidos: (
        <Typography variant="body2">
          <NumericFormat
            value={resumo.totalProventosRecebidos}
            prefix={"R$ "}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator=","
            thousandSeparator="."
            displayType="text"
          />
        </Typography>
      ),
      precoMedio: (
        <Typography variant="body2">
          <NumericFormat
            value={resumo.precoMedio}
            prefix={"R$ "}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator=","
            thousandSeparator="."
            displayType="text"
          />
        </Typography>
      ),
      totalInvestido: (
        <Typography variant="body2">
          <NumericFormat
            value={resumo.totalInvestido}
            prefix={"R$ "}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator=","
            thousandSeparator="."
            displayType="text"
          />
        </Typography>
      ),
    }));
  }
  return [];
}
