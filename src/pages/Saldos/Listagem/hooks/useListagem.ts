import { useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { SaldoConta } from "@/types";
import { queryOptionsGetSaldosContas } from "@/api/Saldos/utils/queryOptionsGetSaldosContas";
import useSearchBar from "@/hooks/useSearchBar";
import { ISeachBar } from "@/interfaces/ISearchBar";
import { useUrlParams } from "@/hooks/useUrlParams";

interface IUseListagemReturn {
  saldos: SaldoConta[] | undefined;
  queryGetSaldosContas: UseQueryResult<SaldoConta[]>;
  searchBar: ISeachBar;
}

export const useListagem = (): IUseListagemReturn => {
  const { setLoading } = useLoading();

  const { searchBar, textoBusca } = useSearchBar({});

  const { getParam } = useUrlParams();

  const queryGetSaldosContas = useQuery({
    ...queryOptionsGetSaldosContas({
      ativo: getParam("ativo") === "false" ? false : true,
    }),
  });

  const saldos =
    queryGetSaldosContas.data?.filter((saldo) => {
      if (!textoBusca) return true;
      const termo = textoBusca.toLowerCase();
      return (
        saldo.nome.toLowerCase().includes(termo) ||
        saldo.agencia.toLowerCase().includes(termo) ||
        saldo.conta.toLowerCase().includes(termo)
      );
    }) ?? [];

  useEffect(() => {
    setLoading(queryGetSaldosContas.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetSaldosContas.isLoading]);

  return {
    saldos,
    queryGetSaldosContas,
    searchBar,
  };
};
