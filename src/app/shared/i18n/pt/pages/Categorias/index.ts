import { IPage } from "../../../interfaces";

const CATEGORIAS: IPage = {
  TITLE: "Categorias",
  SUBTITLE: "Gerencie categorias para entrada e saída.",
  DATA_TABLE: {
    TEXT_FOR_EMPTY_DATA: "Nenhuma categoria encontrada.",
  },
  MODALS: {
    MODAL_CREATE: {
      ADD: "Adicionar Categoria",
      EDIT: "Editar Categoria",
    },
    MODAL_DEACTIVATE: {
      DESCRIPTION:
        "Ao clicar em Inativar, a categoria será inativada. Para visualizá-la novamente, filtre por categorias inativas.",
    },
  },
  SNACK_BARS: {
    CATEGORIA_DEACTIVATE: "Categoria inativada com sucesso!",
    CATEGORIA_ACTIVATE: "Categoria ativada com sucesso!",
    CATEGORIA_CREATE: "Categoria criada com sucesso!",
    CATEGORIA_EDIT: "Categoria editada sucesso!",
  },
};

export default CATEGORIAS;
