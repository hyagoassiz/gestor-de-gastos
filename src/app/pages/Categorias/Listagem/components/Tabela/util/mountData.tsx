import { MoreOptions } from "../../../../../../shared/components/MoreOptions";
import { PowerIcon } from "../../../../../../shared/components/PowerIcon";
import { TipoMovimentacao } from "../../../../../../shared/components/TipoMovimentacao";
import { ICategoria } from "../../../../../../shared/interfaces";

interface IMountData {
  categorias: ICategoria[] | undefined;
  handleInativar: (categoria: ICategoria) => void;
  handleEditar: (categoria: ICategoria) => void;
  handleAtivar: (categoria: ICategoria) => void;
}

export function mountData({
  categorias,
  handleInativar,
  handleEditar,
  handleAtivar,
}: IMountData) {
  if (categorias?.length) {
    return categorias.map((categoria) => ({
      ...categoria,
      nome: categoria.nome,
      tipo: <TipoMovimentacao tipo={categoria.tipo} />,
      situacao: categoria.ativo ? "Ativo" : "Inativo",
      options: (
        <>
          {categoria.ativo ? (
            <MoreOptions
              options={[
                { label: "Editar", action: () => handleEditar(categoria) },
                { label: "Inativar", action: () => handleInativar(categoria) },
              ]}
            />
          ) : (
            <PowerIcon onClick={() => handleAtivar(categoria)} />
          )}
        </>
      ),
    }));
  }
  return [];
}
