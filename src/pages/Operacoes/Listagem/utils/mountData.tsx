import { MenuItem, Typography } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";

interface IMountData {
  operacoes: IOperacaoResponseApi[] | undefined;
  handleEditarOperacao(operacao: IOperacaoResponseApi): void;
}

export function mountData({
  operacoes,
  handleEditarOperacao,
}: IMountData): any[] {
  if (operacoes?.length) {
    return operacoes.map((operacao) => ({
      ...operacao,
      dataOperacao: dayjs(operacao.dataOperacao).format("DD/MM/YYYY"),
      ativo: operacao.ativo?.nome ?? "Ativo não encontrado",
      tipoOperacao: operacao.tipoOperacao.nome,
      valorUnitario: (
        <Typography variant="body2">
          <NumericFormat
            value={operacao.valorUnitario}
            prefix={"R$ "}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator=","
            thousandSeparator="."
            displayType="text"
          />
        </Typography>
      ),
      valorTotal: (
        <Typography variant="body2">
          <NumericFormat
            value={operacao.valorTotal}
            prefix={"R$ "}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator=","
            thousandSeparator="."
            displayType="text"
          />
        </Typography>
      ),
      options: (
        <MoreOptions>
          {({ handleClose }) => (
            <MenuItem
              onClick={() => {
                handleEditarOperacao(operacao);
                handleClose();
              }}
            >
              Editar
            </MenuItem>
          )}
        </MoreOptions>
      ),
    }));
  }
  return [];
}
