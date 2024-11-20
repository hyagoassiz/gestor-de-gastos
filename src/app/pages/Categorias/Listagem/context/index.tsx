import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { ICategoria } from "../../../../shared/interfaces";
import { useQuery } from "@tanstack/react-query";
import { IResponseCategoria } from "../../../../shared/services/categorias/interfaces";
import { categoriasService } from "../../../../shared/services/categorias";

interface ICategoriasContextProps {
  children: ReactNode;
}

interface IListagemCategoriasContextData {
  categorias: IResponseCategoria[] | undefined;
  categoria: ICategoria | undefined;
  setCategoria: Dispatch<SetStateAction<ICategoria | undefined>>;
  toggleModalCategoria: boolean;
  setToggleModalCategoria: Dispatch<SetStateAction<boolean>>;
  toggleFiltro: boolean;
  setToggleFiltro: Dispatch<SetStateAction<boolean>>;
  toggleModalInativar: boolean;
  setToggleModalInativar: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CategoriasContext = createContext(
  {} as IListagemCategoriasContextData
);

export function CategoriasProvider({
  children,
}: ICategoriasContextProps): JSX.Element {
  const [categoria, setCategoria] = useState<ICategoria | undefined>(undefined);
  const [toggleModalCategoria, setToggleModalCategoria] =
    useState<boolean>(false);
  const [toggleFiltro, setToggleFiltro] = useState<boolean>(false);
  const [toggleModalInativar, setToggleModalInativar] =
    useState<boolean>(false);

  const { data } = useQuery({
    refetchOnWindowFocus: true,
    enabled: true,
    ...categoriasService.useQueryListarCategorias({
      ativo: [true],
      tipo: ["Entrada"],
    }),
  });

  console.log(data);

  const categorias: IResponseCategoria[] = [
    {
      id: "1",
      usuario: "BGhDwReOUNVyxLJ9QVIBNGVzHYc2",
      nome: "Alimentação",
      tipo: "Entrada",
      ativo: false,
    },
    {
      id: "2",
      usuario: "BGhDwReOUNVyxLJ9QVIBNGVzHYc2",
      nome: "Saúde",
      tipo: "Entrada",
      ativo: false,
    },
    {
      id: "3",
      usuario: "BGhDwReOUNVyxLJ9QVIBNGVzHYc2",
      nome: "Lazer",
      tipo: "Entrada",
      ativo: false,
    },
  ];

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        categoria,
        setCategoria,
        toggleModalCategoria,
        setToggleModalCategoria,
        toggleFiltro,
        setToggleFiltro,
        toggleModalInativar,
        setToggleModalInativar,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
}
