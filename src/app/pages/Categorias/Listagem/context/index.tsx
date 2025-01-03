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
import {
  IPayloadListarCategorias,
  IResponseCategoria,
} from "../../../../shared/services/categorias/interfaces";
import { categoriasService } from "../../../../shared/services/categorias";
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
  toggleModalCategoria: boolean;
  toggleFiltro: boolean;
  toggleModalInativar: boolean;
  filtroData: IPayloadListarCategorias;
  queryGetCategorias: UseQueryResult;
  setCategoria: Dispatch<SetStateAction<IResponseCategoria | undefined>>;
  setToggleModalCategoria: Dispatch<SetStateAction<boolean>>;
  setToggleFiltro: Dispatch<SetStateAction<boolean>>;
  setToggleModalInativar: Dispatch<SetStateAction<boolean>>;
  setFiltroData: Dispatch<SetStateAction<IPayloadListarCategorias>>;
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
        toggleModalCategoria,
        toggleFiltro,
        toggleModalInativar,
        filtroData,
        queryGetCategorias,
        setCategoria,
        setToggleModalCategoria,
        setToggleFiltro,
        setToggleModalInativar,
        setFiltroData,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
}
