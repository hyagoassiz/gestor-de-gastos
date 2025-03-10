import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ITransacao } from "../../../../shared/interfaces";
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
  openFiltro: boolean;
  openModalExcluir: boolean;
  openModalTransacao: boolean;
  openModalObservacao: boolean;
  filtroData: IPayloadListarTransacoes;
  queryGetTransacoes: UseQueryResult;
  setTrasacao: Dispatch<SetStateAction<ITransacao | undefined>>;
  setOpenFiltro: Dispatch<SetStateAction<boolean>>;
  setOpenModalExcluir: Dispatch<SetStateAction<boolean>>;
  setOpenModalTransacao: Dispatch<SetStateAction<boolean>>;
  setOpenModalObservacao: Dispatch<SetStateAction<boolean>>;
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
  const [openFiltro, setOpenFiltro] = useState<boolean>(false);
  const [openModalExcluir, setOpenModalExcluir] = useState<boolean>(false);
  const [openModalTransacao, setOpenModalTransacao] = useState<boolean>(false);
  const [openModalObservacao, setOpenModalObservacao] =
    useState<boolean>(false);
  const [filtroData, setFiltroData] = useState<IPayloadListarTransacoes>({
    concluido: [true, false],
    tipo: ["ENTRADA", "SAIDA"],
  });

  const dispatch = useDispatch();

  const queryGetTransacoes = useQuery({
    ...transacoesService.useQueryGetTransacoes(filtroData),
  });

  const transacoes: ITransacao[] | undefined = useMemo(() => {
    return queryGetTransacoes.data;
  }, [queryGetTransacoes.data]);

  useEffect(() => {
    dispatch(setLoading(queryGetTransacoes.isLoading));
  }, [queryGetTransacoes.isLoading]);

  return (
    <TransacoesContext.Provider
      value={{
        transacoes,
        transacao,
        openFiltro,
        openModalExcluir,
        openModalTransacao,
        openModalObservacao,
        filtroData,
        queryGetTransacoes,
        setTrasacao,
        setOpenFiltro,
        setOpenModalTransacao,
        setOpenModalObservacao,
        setOpenModalExcluir,
        setFiltroData,
      }}
    >
      {children}
    </TransacoesContext.Provider>
  );
}
