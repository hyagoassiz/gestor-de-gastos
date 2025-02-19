import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { transacoesService } from "../../../../shared/services/transacoes";
import { ISaldo, ISeachBar } from "../../../../shared/interfaces";
import { mountSaldos } from "../../../../shared/utils/mountSaldos";
import useSearchBar from "../../../../shared/hooks/useSearchBar";
import { setLoading } from "../../../../shared/redux/loading/actions";
import { useDispatch } from "react-redux";

interface IListagemSaldosContextProps {
  children: ReactNode;
}

interface IListagemSaldosContextData {
  saldos: ISaldo[] | undefined;
  searchBar: ISeachBar;
  openModalTransferir: boolean;
  idConta: string | null;
  setOpenModalTransferir: Dispatch<SetStateAction<boolean>>;
  setIdConta: Dispatch<SetStateAction<string | null>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SaldosContext = createContext({} as IListagemSaldosContextData);

export function SaldosProvider({
  children,
}: IListagemSaldosContextProps): JSX.Element {
  const [openModalTransferir, setOpenModalTransferir] =
    useState<boolean>(false);
  const [idConta, setIdConta] = useState<string | null>(null);

  const dispatch = useDispatch();

  const { searchBar, textoBusca } = useSearchBar({
    placeHolder: "Pesquisar Conta",
  });

  const queryGetTransacoes = useQuery({
    ...transacoesService.useQueryGetTransacoes({
      concluido: [true, false],
      tipo: ["ENTRADA", "SAIDA"],
    }),
  });

  const saldos: ISaldo[] | undefined = useMemo(() => {
    if (!queryGetTransacoes.data) return undefined;
    return mountSaldos(queryGetTransacoes.data).filter((transacao) =>
      transacao.nomeConta.toLowerCase().includes(textoBusca.toLowerCase())
    );
  }, [queryGetTransacoes.data, textoBusca]);

  useEffect(() => {
    dispatch(setLoading(queryGetTransacoes.isLoading));
  }, [queryGetTransacoes.isLoading]);

  return (
    <SaldosContext.Provider
      value={{
        saldos,
        searchBar,
        openModalTransferir,
        idConta,
        setOpenModalTransferir,
        setIdConta,
      }}
    >
      {children}
    </SaldosContext.Provider>
  );
}
