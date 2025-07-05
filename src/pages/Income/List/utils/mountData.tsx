import { MenuItem, Typography } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";

interface IMountData {
  income: IIncomeResponseApi[] | undefined;
  handleEditIncome(income: IIncomeResponseApi): void;
}

export function mountData({ income, handleEditIncome }: IMountData): any[] {
  if (income?.length) {
    return income.map((_income) => ({
      ..._income,
      dataRecebimento: dayjs(_income.dataRecebimento).format("DD/MM/YYYY"),
      tipoProvento: _income.tipoProvento.nome,
      ativo: _income.ativo?.nome ?? "Ativo não encontrado",
      valor: (
        <Typography variant="body2">
          <NumericFormat
            value={_income.valor}
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
          <MenuItem
            onClick={() => {
              handleEditIncome(_income);
            }}
          >
            Editar
          </MenuItem>
        </MoreOptions>
      ),
    }));
  }
  return [];
}
