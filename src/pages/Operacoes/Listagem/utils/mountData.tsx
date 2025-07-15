import { MenuItem, Typography } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";

interface IMountDataProps {
  operacoes: IOperacaoResponseApi[] | undefined;
  handleEditarOperacao(operacao: IOperacaoResponseApi): void;
  handleDuplicarOperacao(operacao: IOperacaoResponseApi): void;
}

export function mountData({
  operacoes,
  handleEditarOperacao,
  handleDuplicarOperacao,
}: IMountDataProps): any[] {
  if (operacoes?.length) {
    return operacoes.map((operacao) => ({
      ...operacao,
      dataOperacao: dayjs(operacao.dataOperacao).format("DD/MM/YYYY"),
      ativo: operacao.ativo?.nome ?? "Ativo não encontrado",
      tipoOperacao: operacao?.tipoOperacao?.nome,
      precoUnitario: (
        <Typography variant="body2">
          <NumericFormat
            value={operacao.precoUnitario}
            prefix={"R$ "}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator=","
            thousandSeparator="."
            displayType="text"
          />
        </Typography>
      ),
      total: (
        <Typography variant="body2">
          <NumericFormat
            value={operacao.total}
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
            <div>
              <MenuItem
                onClick={() => {
                  handleEditarOperacao(operacao);
                  handleClose();
                }}
              >
                Editar
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleDuplicarOperacao(operacao);
                  handleClose();
                }}
              >
                Duplicar
              </MenuItem>
            </div>
          )}
        </MoreOptions>
      ),
    }));
  }
  return [];
}
