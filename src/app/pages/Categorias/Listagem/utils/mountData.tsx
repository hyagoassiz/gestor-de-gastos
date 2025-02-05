import { MoreOptions } from "../../../../shared/components/MoreOptions";
import { PowerIcon } from "../../../../shared/components/PowerIcon";
import { TipoMovimentacao } from "../../../../shared/components/TipoMovimentacao";
import { ICategoria } from "../../../../shared/interfaces";

interface IMountData {
  categorias: ICategoria[] | undefined;
  handleInativarCategoria: (categoria: ICategoria) => void;
  handleEditarCategoria: (categoria: ICategoria) => void;
  handleAtivarCategoria: (categoria: ICategoria) => void;
}

export function mountData({
  categorias,
  handleInativarCategoria,
  handleEditarCategoria,
  handleAtivarCategoria,
}: IMountData) {
  if (categorias?.length) {
    return categorias.map((categoria) => ({
      ...categoria,
      nome: categoria.nome,
      tipo: <TipoMovimentacao tipo={categoria.tipo} />,
      options: (
        <>
          {categoria.ativo ? (
            <MoreOptions
              options={[
                {
                  label: "Editar",
                  action: () => handleEditarCategoria(categoria),
                },
                {
                  label: "Inativar",
                  action: () => handleInativarCategoria(categoria),
                },
              ]}
            />
          ) : (
            <PowerIcon onClick={() => handleAtivarCategoria(categoria)} />
          )}
        </>
      ),
    }));
  }
  return [];
}
