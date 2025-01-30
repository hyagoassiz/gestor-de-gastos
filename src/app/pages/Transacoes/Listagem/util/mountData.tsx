import { ListItemText, Typography } from "@mui/material";
import { ITransacao } from "../../../../shared/interfaces";
import { TipoMovimentacao } from "../../../../shared/components/TipoMovimentacao";
import { NumericFormat } from "react-number-format";

interface IMountData {
  transacoes: ITransacao[] | undefined;
}

export function mountData({ transacoes }: IMountData) {
  if (transacoes?.length) {
    return transacoes.map((transacao) => ({
      ...transacao,
      nome: transacao.data,
      tipo: <TipoMovimentacao tipo={transacao.tipo} />,
      categoria: transacao.nomeCategoria,
      conta: (
        <ListItemText
          primary={transacao.nomeConta}
          primaryTypographyProps={{ fontSize: "14px" }}
          secondary={
            transacao.agencia && transacao.conta
              ? `Agência ${transacao.agencia} / Conta ${transacao.conta}`
              : ""
          }
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      ),
      valor: (
        <Typography variant="body2">
          <NumericFormat
            value={transacao.valor}
            prefix={"R$ "}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator=","
            thousandSeparator={"."}
            displayType="text"
          />
        </Typography>
      ),
    }));
  }
  return [];
}
