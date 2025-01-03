import { ITranslation } from "./interfaces";
import BUTTONS from "./pt/buttons";
import INFO from "./pt/info";
import CATEGORIAS from "./pt/pages/Categorias";
import CONTAS from "./pt/pages/Contas";
import TOOLTIPS from "./pt/tooltips";

const pt: ITranslation = {
  BUTTONS,
  TOOLTIPS,
  INFO,
  PAGES: { CATEGORIAS, CONTAS },
};

export default pt;
