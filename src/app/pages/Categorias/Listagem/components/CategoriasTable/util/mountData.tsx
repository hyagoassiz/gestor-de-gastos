import MoreOptions from "../../../../../../shared/components/MoreOptions/MoreOptions";
import { ICategoria } from "../../../../../../shared/interfaces";
import { PowerIcon } from "../../../../../../shared/components/PowerIcon";

interface IMountData {
  categorias: ICategoria[];
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
  if (categorias.length) {
    return categorias.map((categoria) => ({
      ...categoria,
      id: categoria.id,
      nome: categoria.nome,
      tipo: categoria.tipo,
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
