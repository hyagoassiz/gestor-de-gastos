import { ReactElement } from "react";

export interface IOptionsSideBar {
  title: "Sub Cadastros" | "Movimentações" | "Configurações" | "";
  routes: {
    name: string;
    route: string;
    function?: () => Promise<void>;
    icon?: ReactElement;
  }[];
}
