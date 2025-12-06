import { ListItemText, MenuItem } from "@mui/material";
import { getAgenciaContaLabel } from "../../../../utils/getSecondaryText";
import { NumericFormat } from "react-number-format";
import { SaldoConta } from "@/types";
import { MoreOptions } from "@/components/MoreOptions";
import { ModalAjustarSaldoState } from "../types";

interface MountDataProps {
  saldos: SaldoConta[] | undefined;
  openModalAjustarSaldo(
    conta: Pick<ModalAjustarSaldoState, "conta">,
    valorAtual: number
  ): void;
}

export function mountData({
  saldos,
  openModalAjustarSaldo,
}: MountDataProps): any[] {
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
                  onClick={() => {
                    handleClose();
                    openModalAjustarSaldo(
                      {
                        conta: { id: saldo.contaId, nome: saldo.nome },
                      },
                      saldo.saldo
                    );
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
