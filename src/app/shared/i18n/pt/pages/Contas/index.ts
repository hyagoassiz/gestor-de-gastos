import { IPage } from "../../../interfaces";

const CONTAS: IPage = {
  TITLE: "Contas",
  SUBTITLE: "Gerencie contas para entrada e saída.",
  DATA_TABLE: {
    TEXT_FOR_EMPTY_DATA: "Nenhuma conta encontrada.",
  },
  MODALS: {
    MODAL_CREATE: {
      ADD: "Adicionar Conta",
      EDIT: "Editar Conta",
    },
    MODAL_DEACTIVATE: {
      DESCRIPTION:
        "Ao clicar em Inativar, a conta será inativada. Para visualizá-la novamente, filtre por contas inativas.",
    },
  },
  SNACK_BARS: {
    DEACTIVATE: "Conta inativada com sucesso!",
    ACTIVATE: "Conta ativada com sucesso!",
    CREATE: "Conta criada com sucesso!",
    EDIT: "Conta editada sucesso!",
  },
};

export default CONTAS;
