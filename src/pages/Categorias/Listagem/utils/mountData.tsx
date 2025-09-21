import { MenuItem } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { PowerIcon } from "../../../../components/PowerIcon";
import { EnumTipoMotimentacaoApi } from "../../../../api/interfaces/EnumTipoMotimentacaoApi";
import { ICategoriaApi } from "../../../../api/Categorias/interfaces";

interface IMountDataProps {
  categorias: IPaginatedResponse<ICategoriaApi> | undefined;
  handleAtivarCategoriaById(id: number): Promise<void>;
  handleEditarCategoria(categoria: ICategoriaApi): void;
  handleInativarCategoriaById(id: number): void;
}

export function mountData({
  categorias,
  handleAtivarCategoriaById,
  handleEditarCategoria,
  handleInativarCategoriaById,
}: IMountDataProps): any[] {
  if (categorias?.content.length) {
    return categorias.content.map((categoria) => ({
      ...categoria,
      tipoMovimentacao: EnumTipoMotimentacaoApi[categoria.tipoMovimentacao],
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
