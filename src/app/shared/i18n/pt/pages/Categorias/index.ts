import { IPage } from "../../../interfaces";

const CATEGORIAS: IPage = {
  TITLE: "Categorias",
  SUBTITLE: "Gerencie categorias para entrada e saída",
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
    DEACTIVATE: "Categoria inativada com sucesso!",
    ACTIVATE: "Categoria ativada com sucesso!",
    CREATE: "Categoria criada com sucesso!",
    EDIT: "Categoria editada sucesso!",
  },
};

export default CATEGORIAS;
