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
        "Ao clicar em Inativar, a categoria será desativada. Para visualizá-la novamente, filtre por categorias inativas.",
    },
  },
};

export default CATEGORIAS;
