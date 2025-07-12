import { MenuItem } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { PowerIcon } from "../../../../components/PowerIcon";

interface IMountDataProps {
  ativos: IAtivoResponseApi[] | undefined;
  handleAtivarAtivo(ativo: IAtivoResponseApi): Promise<void>;
  handleInativarAtivo(ativo: IAtivoResponseApi): void;
  handleEditarAtivo(ativo: IAtivoResponseApi): void;
}

export function mountData({
  ativos,
  handleAtivarAtivo,
  handleEditarAtivo,
  handleInativarAtivo,
}: IMountDataProps): any[] {
  if (ativos?.length) {
    return ativos.map((ativo) => ({
      ...ativo,
      tipo: ativo?.tipo.nome,
      options: (
        <div>
          {ativo.ativo ? (
            <MoreOptions>
              {({ handleClose }) => (
                <div>
                  <MenuItem
                    onClick={() => {
                      handleEditarAtivo(ativo);
                      handleClose();
                    }}
                  >
                    Editar
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleInativarAtivo(ativo);
                      handleClose();
                    }}
                  >
                    Inativar
                  </MenuItem>
                </div>
              )}
            </MoreOptions>
          ) : (
            <PowerIcon onClick={() => handleAtivarAtivo(ativo)} />
          )}
        </div>
      ),
    }));
  }
  return [];
}
