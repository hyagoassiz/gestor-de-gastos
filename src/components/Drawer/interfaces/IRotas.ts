import { ReactElement } from "react";

export interface IRotas {
  categoria: "" | "Movimentações" | "Sub Cadastros";
  rotas: {
    name: string;
    route: string;
    icon?: ReactElement;
    function?: () => Promise<void>;
  }[];
}
