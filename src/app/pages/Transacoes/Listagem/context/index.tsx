import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSearchBar from "../../../../shared/hooks/useSearchBar";
import { ISeachBar, ITransacao } from "../../../../shared/interfaces";
import { IPayloadListarTransacoes } from "../../../../shared/services/transacoes/interfaces";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { transacoesService } from "../../../../shared/services/transacoes";
import { setLoading } from "../../../../shared/redux/loading/actions";

interface ITransacoesContextProps {
  children: ReactNode;
}

interface IListagemTransacoesContextData {
  transacoes: ITransacao[] | undefined;
  transacao: ITransacao | undefined;
  searchBar: ISeachBar;
  toggleModalTransacao: boolean;
  toggleFiltro: boolean;
  toggleModalExcluir: boolean;
  filtroData: IPayloadListarTransacoes;
  queryGetTransacoes: UseQueryResult;
  setTrasacao: Dispatch<SetStateAction<ITransacao | undefined>>;
  setToggleModalTransacao: Dispatch<SetStateAction<boolean>>;
  setToggleFiltro: Dispatch<SetStateAction<boolean>>;
  setToggleModalExcluir: Dispatch<SetStateAction<boolean>>;
  setFiltroData: Dispatch<SetStateAction<IPayloadListarTransacoes>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransacoesContext = createContext(
  {} as IListagemTransacoesContextData
);

export function TransacoesProvider({
  children,
}: ITransacoesContextProps): JSX.Element {
  const [transacao, setTrasacao] = useState<ITransacao | undefined>(undefined);
  const [toggleModalTransacao, setToggleModalTransacao] =
    useState<boolean>(false);
  const [toggleFiltro, setToggleFiltro] = useState<boolean>(false);
  const [toggleModalExcluir, setToggleModalExcluir] = useState<boolean>(false);
  const [filtroData, setFiltroData] = useState<IPayloadListarTransacoes>({
    concluido: [true],
  });

  const dispatch = useDispatch();

  const { searchBar, textoBusca } = useSearchBar({
    placeHolder: "Pesquisar Contas",
  });

  const queryGetTransacoes = useQuery({
    ...transacoesService.useQueryGetTransacoes(filtroData),
  });

  const transacoes: ITransacao[] | undefined = useMemo(() => {
    if (textoBusca !== "") {
      return queryGetTransacoes.data?.filter((categoria) =>
        categoria.nomeConta.toLowerCase().includes(textoBusca.toLowerCase())
      );
    } else {
      return queryGetTransacoes.data;
    }
  }, [queryGetTransacoes.data, textoBusca]);

  useEffect(() => {
    dispatch(setLoading(queryGetTransacoes.isLoading));
  }, [queryGetTransacoes.isLoading, dispatch]);

  return (
    <TransacoesContext.Provider
      value={{
        transacoes,
        transacao,
        searchBar,
        toggleModalTransacao,
        toggleFiltro,
        toggleModalExcluir,
        filtroData,
        queryGetTransacoes,
        setTrasacao,
        setToggleModalTransacao,
        setToggleFiltro,
        setToggleModalExcluir,
        setFiltroData,
      }}
    >
      {children}
    </TransacoesContext.Provider>
  );
}
