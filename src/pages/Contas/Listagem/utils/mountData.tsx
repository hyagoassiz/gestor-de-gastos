import { ListItemText, MenuItem } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { PowerIcon } from "../../../../components/PowerIcon";
import { getAgenciaContaLabel } from "../../../../utils/getSecondaryText";

interface IMountDataProps {
  contas: IContaApi[] | undefined;
  handleAtivarContaById(id: string): Promise<void>;
  handleEditarConta(conta: IContaApi): void;
  handleInativarContaById(id: string): void;
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
      nome: (
        <ListItemText
          primary={conta.nome}
          secondary={getAgenciaContaLabel(conta.agencia, conta.conta)}
          sx={{ my: 0, height: 48 }}
        />
      ),
      tipo: conta.tipo.nome,
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
