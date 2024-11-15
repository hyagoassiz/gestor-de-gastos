import { IButton } from "./IButton";
import { IPage } from "./IPage";
import { ITooltips } from "./ITooltips";

export interface ITranslation {
  BUTTONS: IButton;
  TOOLTIPS: ITooltips;
  PAGES: { CATEGORIAS: IPage };
}
