import { ListItemText, MenuItem } from "@mui/material";
import { getAgenciaContaLabel } from "../../../../utils/getSecondaryText";
import { NumericFormat } from "react-number-format";
import { SaldoConta } from "@/types";
import { MoreOptions } from "@/components/MoreOptions";

interface MountDataProps {
  saldos: SaldoConta[] | undefined;
}

export function mountData({ saldos }: MountDataProps): any[] {
  if (saldos?.length) {
    return saldos.map((saldo) => ({
      ...saldo,
      id: saldo.contaId,
      conta:
        saldo.conta && saldo.agencia ? (
          <ListItemText
            primary={saldo.nome}
            primaryTypographyProps={{ fontSize: "14px" }}
            secondaryTypographyProps={{ fontSize: "12px" }}
            secondary={getAgenciaContaLabel(saldo.agencia, saldo.conta)}
            sx={{ my: 0, height: "auto" }}
          />
        ) : (
          saldo.nome
        ),
      saldo: (
        <NumericFormat
          value={saldo.saldo}
          displayType="text"
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
        />
      ),
      options: (
        <div>
          <MoreOptions>
            {({ handleClose }) => (
              <div>
                <MenuItem
                  disabled
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Ajustar saldo
                </MenuItem>
              </div>
            )}
          </MoreOptions>
        </div>
      ),
      style: { height: "48px" },
    }));
  }
  return [];
}
