import { MenuItem } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { PowerIcon } from "../../../../components/PowerIcon";
import { Categoria, PaginatedResponse } from "@/types";
import { EnumTipoMovimentacao } from "@/types/enums";

interface IMountDataProps {
  categorias: PaginatedResponse<Categoria> | undefined;
  handleAtivarCategoriaById(id: number): void;
  handleEditarCategoria(id: number): void;
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
      tipoMovimentacao: EnumTipoMovimentacao[categoria.tipoMovimentacao],
      options: (
        <div>
          {categoria.ativo ? (
            <MoreOptions>
              {({ handleClose }) => (
                <div>
                  <MenuItem
                    onClick={() => {
                      handleEditarCategoria(categoria.id);
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
