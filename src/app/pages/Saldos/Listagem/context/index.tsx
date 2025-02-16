import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useMemo } from "react";
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
}

// eslint-disable-next-line react-refresh/only-export-components
export const SaldosContext = createContext({} as IListagemSaldosContextData);

export function SaldosProvider({
  children,
}: IListagemSaldosContextProps): JSX.Element {
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
      }}
    >
      {children}
    </SaldosContext.Provider>
  );
}
