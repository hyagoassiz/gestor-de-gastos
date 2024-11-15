import { IButton } from "./IButton";
import { IInfo } from "./IInfo";
import { IPage } from "./IPage";
import { ITooltips } from "./ITooltips";

export interface ITranslation {
  BUTTONS: IButton;
  TOOLTIPS: ITooltips;
  INFO: IInfo;
  PAGES: { CATEGORIAS: IPage };
}
