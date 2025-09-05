import { MenuItem } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { PowerIcon } from "../../../../components/PowerIcon";

interface IMountDataProps {
  categorias: ICategoriaApi[] | undefined;
  handleAtivarCategoriaById(id: string): Promise<void>;
  handleEditarCategoria(categoria: ICategoriaApi): void;
  handleInativarCategoriaById(id: string): void;
}

export function mountData({
  categorias,
  handleAtivarCategoriaById,
  handleEditarCategoria,
  handleInativarCategoriaById,
}: IMountDataProps): any[] {
  if (categorias?.length) {
    return categorias.map((categoria) => ({
      ...categoria,
      tipo: categoria.tipo.nome,
      options: (
        <div>
          {categoria.ativo ? (
            <MoreOptions>
              {({ handleClose }) => (
                <div>
                  <MenuItem
                    onClick={() => {
                      handleEditarCategoria(categoria);
                      handleClose();
                    }}
                  >
                    Editar
                  </MenuItem>

                  <MenuItem
                    onClick={() => {
                      handleInativarCategoriaById(categoria.id);
                      handleClose();
                    }}
                  >
                    Inativar
                  </MenuItem>
                </div>
              )}
            </MoreOptions>
          ) : (
            <PowerIcon
              onClick={() => handleAtivarCategoriaById(categoria.id)}
            />
          )}
        </div>
      ),
      style: { height: "48px" },
    }));
  }
  return [];
}
