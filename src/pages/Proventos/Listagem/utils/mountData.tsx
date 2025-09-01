import { ListItemText, MenuItem, Typography } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";

interface IMountDataProps {
  proventos: IProventoResponseApi[] | undefined;
  handleDuplicarProvento(provento: IProventoResponseApi): void;
  handleEditProventos(provento: IProventoResponseApi): void;
}

export function mountData({
  proventos,
  handleDuplicarProvento,
  handleEditProventos,
}: IMountDataProps): any[] {
  if (proventos?.length) {
    return proventos.map((provento) => ({
      ...provento,
      dataPagamento: dayjs(provento.dataPagamento).format("DD/MM/YYYY"),
      tipoProvento: provento.tipoProvento?.nome ?? "Não encontrado",
      ativo: (
        <ListItemText
          primary={provento?.ativo?.sigla ?? "Ativo não encontrado"}
          secondary={provento?.ativo?.nome ?? "-"}
          primaryTypographyProps={{ fontSize: "14px" }}
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      ),
      total: (
        <Typography variant="body2">
          <NumericFormat
            value={provento.total}
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
                  handleEditProventos(provento);
                  handleClose();
                }}
              >
                Editar
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleDuplicarProvento(provento);
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
