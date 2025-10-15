import { MenuItem } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { PowerIcon } from "../../../../components/PowerIcon";
import { Categoria } from "@/types";
import { EnumTipoMovimentacao } from "@/types/enums";

interface IMountDataProps {
  categorias: IPaginatedResponse<Categoria> | undefined;
  handleAtivarCategoriaById(id: number): Promise<void>;
  handleEditarCategoria(categoriaId: string): void;
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
                      handleEditarCategoria(String(categoria.id));
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
