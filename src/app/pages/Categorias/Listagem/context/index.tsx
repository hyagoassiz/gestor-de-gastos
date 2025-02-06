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
import { IPayloadListarCategorias } from "../../../../shared/services/categorias/interfaces";
import { categoriasService } from "../../../../shared/services/categorias";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../shared/redux/loading/actions";
import useSearchBar from "../../../../shared/hooks/useSearchBar";
import { ICategoria, ISeachBar } from "../../../../shared/interfaces";

interface ICategoriasContextProps {
  children: ReactNode;
}

interface IListagemCategoriasContextData {
  categorias: ICategoria[] | undefined;
  categoria: ICategoria | undefined;
  filtroData: IPayloadListarCategorias;
  queryGetCategorias: UseQueryResult;
  searchBar: ISeachBar;
  openFiltro: boolean;
  openModalCategoria: boolean;
  openModalInativar: boolean;
  setCategoria: Dispatch<SetStateAction<ICategoria | undefined>>;
  setFiltroData: Dispatch<SetStateAction<IPayloadListarCategorias>>;
  setOpenFiltro: Dispatch<SetStateAction<boolean>>;
  setOpenModalCategoria: Dispatch<SetStateAction<boolean>>;
  setOpenModalInativar: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CategoriasContext = createContext(
  {} as IListagemCategoriasContextData
);

export function CategoriasProvider({
  children,
}: ICategoriasContextProps): JSX.Element {
  const [categoria, setCategoria] = useState<ICategoria | undefined>(undefined);
  const [openModalCategoria, setOpenModalCategoria] = useState<boolean>(false);
  const [openFiltro, setOpenFiltro] = useState<boolean>(false);
  const [filtroData, setFiltroData] = useState<IPayloadListarCategorias>({
    ativo: [true],
    tipo: [],
  });
  const [openModalInativar, setOpenModalInativar] = useState<boolean>(false);

  const dispatch = useDispatch();

  const { searchBar, textoBusca } = useSearchBar({
    placeHolder: "Pesquisar Categoria",
  });

  const queryGetCategorias = useQuery({
    ...categoriasService.useQueryGetCategorias(filtroData),
  });

  const categorias: ICategoria[] | undefined = useMemo(() => {
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
        filtroData,
        queryGetCategorias,
        searchBar,
        openFiltro,
        openModalCategoria,
        openModalInativar,
        setCategoria,
        setFiltroData,
        setOpenFiltro,
        setOpenModalCategoria,
        setOpenModalInativar,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
}
