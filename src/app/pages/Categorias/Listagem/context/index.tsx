import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IResponseCategoria } from "../../../../shared/services/categorias/interfaces";
import { categoriasService } from "../../../../shared/services/categorias";
import { IPayloadListarCategorias } from "../interfaces";

interface ICategoriasContextProps {
  children: ReactNode;
}

interface IListagemCategoriasContextData {
  categorias: IResponseCategoria[] | undefined;
  categoria: IResponseCategoria | undefined;
  setCategoria: Dispatch<SetStateAction<IResponseCategoria | undefined>>;
  toggleModalCategoria: boolean;
  setToggleModalCategoria: Dispatch<SetStateAction<boolean>>;
  toggleFiltro: boolean;
  setToggleFiltro: Dispatch<SetStateAction<boolean>>;
  toggleModalInativar: boolean;
  setToggleModalInativar: Dispatch<SetStateAction<boolean>>;
  filtroData: IPayloadListarCategorias;
  setFiltroData: Dispatch<SetStateAction<IPayloadListarCategorias>>;
  queryGetCategorias: UseQueryResult;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CategoriasContext = createContext(
  {} as IListagemCategoriasContextData
);

export function CategoriasProvider({
  children,
}: ICategoriasContextProps): JSX.Element {
  const [categoria, setCategoria] = useState<IResponseCategoria | undefined>(
    undefined
  );
  const [toggleModalCategoria, setToggleModalCategoria] =
    useState<boolean>(false);
  const [toggleFiltro, setToggleFiltro] = useState<boolean>(false);
  const [toggleModalInativar, setToggleModalInativar] =
    useState<boolean>(false);
  const [filtroData, setFiltroData] = useState<IPayloadListarCategorias>({
    ativo: [true],
    tipo: [],
  });

  const queryGetCategorias = useQuery({
    refetchOnWindowFocus: false,
    enabled: true,
    ...categoriasService.useQueryGetCategorias(filtroData),
  });

  const categorias: IResponseCategoria[] | undefined = useMemo(() => {
    return queryGetCategorias.data;
  }, [queryGetCategorias.data]);

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
        filtroData,
        setFiltroData,
        queryGetCategorias,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
}
