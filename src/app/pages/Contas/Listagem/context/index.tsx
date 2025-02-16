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
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../shared/redux/loading/actions";
import useSearchBar from "../../../../shared/hooks/useSearchBar";
import { IConta, ISeachBar } from "../../../../shared/interfaces";
import { IPayloadListarContas } from "../../../../shared/services/contas/interfaces";
import { contasService } from "../../../../shared/services/contas";

interface IContasContextProps {
  children: ReactNode;
}

interface IListagemContasContextData {
  contas: IConta[] | undefined;
  conta: IConta | undefined;
  searchBar: ISeachBar;
  openFiltro: boolean;
  openModalConta: boolean;
  openModalObservacao: boolean;
  openModalInativar: boolean;
  filtroData: IPayloadListarContas;
  queryGetContas: UseQueryResult;
  setConta: Dispatch<SetStateAction<IConta | undefined>>;
  setOpenFiltro: Dispatch<SetStateAction<boolean>>;
  setOpenModalConta: Dispatch<SetStateAction<boolean>>;
  setOpenModalObservacao: Dispatch<SetStateAction<boolean>>;
  setOpenModalInativar: Dispatch<SetStateAction<boolean>>;
  setFiltroData: Dispatch<SetStateAction<IPayloadListarContas>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ContasContext = createContext({} as IListagemContasContextData);

export function ContasProvider({ children }: IContasContextProps): JSX.Element {
  const [conta, setConta] = useState<IConta | undefined>(undefined);
  const [openFiltro, setOpenFiltro] = useState<boolean>(false);
  const [openModalConta, setOpenModalConta] = useState<boolean>(false);
  const [openModalObservacao, setOpenModalObservacao] =
    useState<boolean>(false);
  const [openModalInativar, setOpenModalInativar] = useState<boolean>(false);
  const [filtroData, setFiltroData] = useState<IPayloadListarContas>({
    ativo: [true],
    tipoConta: [],
  });

  const dispatch = useDispatch();

  const { searchBar, textoBusca } = useSearchBar({
    placeHolder: "Pesquisar Conta",
  });

  const queryGetContas = useQuery({
    ...contasService.useQueryGetContas(filtroData),
  });

  const contas: IConta[] | undefined = useMemo(() => {
    if (textoBusca !== "") {
      return queryGetContas.data?.filter((categoria) =>
        categoria.nome.toLowerCase().includes(textoBusca.toLowerCase())
      );
    } else {
      return queryGetContas.data;
    }
  }, [queryGetContas.data, textoBusca]);

  useEffect(() => {
    dispatch(setLoading(queryGetContas.isLoading));
  }, [queryGetContas.isLoading, dispatch]);

  return (
    <ContasContext.Provider
      value={{
        contas,
        conta,
        searchBar,
        openFiltro,
        openModalConta,
        openModalObservacao,
        openModalInativar,
        filtroData,
        queryGetContas,
        setConta,
        setOpenFiltro,
        setOpenModalConta,
        setOpenModalObservacao,
        setOpenModalInativar,
        setFiltroData,
      }}
    >
      {children}
    </ContasContext.Provider>
  );
}
