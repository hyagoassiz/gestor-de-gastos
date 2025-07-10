import { MenuItem, Typography } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";

interface IMountData {
  income: IIncomeResponseApi[] | undefined;
  handleDuplicarProvento(income: IIncomeResponseApi): void;
  handleEditIncome(income: IIncomeResponseApi): void;
}

export function mountData({
  income,
  handleDuplicarProvento,
  handleEditIncome,
}: IMountData): any[] {
  if (income?.length) {
    return income.map((_income) => ({
      dataRecebimento: dayjs(_income.dataRecebimento).format("DD/MM/YYYY"),
      tipoProvento: _income.tipoProvento?.nome ?? "Não encontrado",
      ativo: _income?.ativo?.nome ?? "Ativo não encontrado",
      valorTotal: (
        <Typography variant="body2">
          <NumericFormat
            value={_income.valorTotal}
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
            <>
              <MenuItem
                onClick={() => {
                  handleEditIncome(_income);
                  handleClose();
                }}
              >
                Editar
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleDuplicarProvento(_income);
                  handleClose();
                }}
              >
                Duplicar
              </MenuItem>
            </>
          )}
        </MoreOptions>
      ),
    }));
  }
  return [];
}
