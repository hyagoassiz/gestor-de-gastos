import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IResponseCategoria } from "../../../../shared/services/categorias/interfaces";
import { categoriasService } from "../../../../shared/services/categorias";
import { IPayloadListarCategorias } from "../interfaces";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../shared/redux/loading/actions";

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
    ativo: [],
    tipo: [],
  });

  const dispatch = useDispatch();

  const queryGetCategorias = useQuery({
    ...categoriasService.useQueryGetCategorias(filtroData),
  });

  const categorias: IResponseCategoria[] | undefined = useMemo(() => {
    return queryGetCategorias.data;
  }, [queryGetCategorias.data]);

  useEffect(() => {
    dispatch(setLoading(queryGetCategorias.isLoading));
  }, [queryGetCategorias.isLoading]);

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
