import { ReactElement } from "react";

export interface IRotas {
  categoria: "" | "Cadastrar";
  rotas: {
    name: string;
    route: string;
    icon?: ReactElement;
    function?: () => Promise<void>;
  }[];
}
