import MoreOptions from "../../../../../../shared/components/MoreOptions/MoreOptions";
import { ICategoria } from "../../../../../../shared/interfaces";

interface IMountData {
  categorias: ICategoria[];
  handleInativar: (categoria: ICategoria) => void;
}

export function mountData({ categorias, handleInativar }: IMountData) {
  if (categorias.length) {
    return categorias.map((categoria) => ({
      ...categoria,
      id: categoria.id,
      nome: categoria.nome,
      tipo: categoria.tipo,
      situacao: categoria.ativo ? "Ativo" : "Inativo",
      options: (
        <MoreOptions
          options={[
            { label: "Editar", action: () => console.log("teste") },
            { label: "Inativar", action: () => handleInativar(categoria) },
          ]}
        />
      ),
    }));
  }
  return [];
}
