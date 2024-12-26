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
import useSearchBar from "../../../../shared/hooks/useSearchBar";
import { ISeachBar } from "../../../../shared/interfaces";

interface ICategoriasContextProps {
  children: ReactNode;
}

interface IListagemCategoriasContextData {
  categorias: IResponseCategoria[] | undefined;
  categoria: IResponseCategoria | undefined;
  searchBar: ISeachBar;
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

  const dispatch = useDispatch();

  const { searchBar, textoBusca } = useSearchBar({
    placeHolder: "Pesquisar Categorias",
  });

  const queryGetCategorias = useQuery({
    ...categoriasService.useQueryGetCategorias(filtroData),
  });

  const categorias: IResponseCategoria[] | undefined = useMemo(() => {
    if (textoBusca !== "") {
      return queryGetCategorias.data?.filter((categoria) =>
        categoria.nome.toLowerCase().includes(textoBusca.toLowerCase())
      );
    } else {
      return queryGetCategorias.data;
    }
  }, [queryGetCategorias.data, textoBusca]);

  useEffect(() => {
    dispatch(setLoading(queryGetCategorias.isLoading));
  }, [queryGetCategorias.isLoading, dispatch]);

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        categoria,
        searchBar,
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
