import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { ICategoria } from "../../../../shared/interfaces";

interface ICategoriasContextProps {
  children: ReactNode;
}

interface IListagemCategoriasContextData {
  categorias: ICategoria[];
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

  const categorias: ICategoria[] = [
    { id: 1, nome: "Alimentação", tipo: "Entrada", ativo: true },
    { id: 2, nome: "Saúde", tipo: "Entrada", ativo: true },
    { id: 3, nome: "Lazer", tipo: "Entrada", ativo: true },
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
