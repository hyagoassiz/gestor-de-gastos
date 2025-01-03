import MoreOptions from "../../../../../../shared/components/MoreOptions/MoreOptions";
import { PowerIcon } from "../../../../../../shared/components/PowerIcon";
import { TipoMovimentacao } from "../../../../../../shared/components/TipoMovimentacao";
import { IResponseCategoria } from "../../../../../../shared/services/categorias/interfaces";

interface IMountData {
  categorias: IResponseCategoria[] | undefined;
  handleInativar: (categoria: IResponseCategoria) => void;
  handleEditar: (categoria: IResponseCategoria) => void;
  handleAtivar: (categoria: IResponseCategoria) => void;
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
