import { ListItemText, MenuItem } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { PowerIcon } from "../../../../components/PowerIcon";
import { getAgenciaContaLabel } from "../../../../utils/getSecondaryText";

interface IMountDataProps {
  contas: IContaApi[] | undefined;
  handleAtivarContaById(id: number): Promise<void>;
  handleEditarConta(conta: IContaApi): void;
  handleInativarContaById(id: number): void;
}

export function mountData({
  contas,
  handleAtivarContaById,
  handleEditarConta,
  handleInativarContaById,
}: IMountDataProps): any[] {
  if (contas?.length) {
    return contas.map((conta) => ({
      ...conta,
      nome:
        conta.agencia && conta.conta ? (
          <ListItemText
            primary={conta.nome}
            primaryTypographyProps={{ fontSize: "14px" }}
            secondaryTypographyProps={{ fontSize: "12px" }}
            secondary={getAgenciaContaLabel(conta.agencia, conta.conta)}
            sx={{ my: 0, height: 48 }}
          />
        ) : (
          conta.nome
        ),
      tipo: conta.tipoConta,
      incluirEmSomas: conta.incluirEmSomas ? "Sim" : "Não",
      options: (
        <div>
          {conta.ativo ? (
            <MoreOptions>
              {({ handleClose }) => (
                <div>
                  <MenuItem
                    onClick={() => {
                      handleEditarConta(conta);
                      handleClose();
                    }}
                  >
                    Editar
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleInativarContaById(conta.id);
                      handleClose();
                    }}
                  >
                    Inativar
                  </MenuItem>
                </div>
              )}
            </MoreOptions>
          ) : (
            <PowerIcon onClick={() => handleAtivarContaById(conta.id)} />
          )}
        </div>
      ),
      style: { height: "48px" },
    }));
  }
  return [];
}
