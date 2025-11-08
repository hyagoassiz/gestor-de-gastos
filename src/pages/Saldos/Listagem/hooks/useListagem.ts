import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { SaldoConta, SearchBar } from "@/types";
import { queryOptionsGetSaldosContas } from "@/api/Saldos/utils/queryOptionsGetSaldosContas";
import useSearchBar from "@/hooks/useSearchBar";
import { useUrlParams } from "@/hooks/useUrlParams";

interface UseListagemReturn {
  saldos: SaldoConta[] | undefined;
  isModalTransferirSaldoOpen: boolean;
  queryGetSaldosContas: UseQueryResult<SaldoConta[]>;
  searchBar: SearchBar;
  toggleModalTransferirSaldo(): void;
}

export const useListagem = (): UseListagemReturn => {
  const { setLoading } = useLoading();

  const { searchBar, textoBusca } = useSearchBar({});

  const { getParam } = useUrlParams();

  const [isModalTransferirSaldoOpen, setIsModalTransferirSaldoOpen] =
    useState<boolean>(false);

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

  function toggleModalTransferirSaldo(): void {
    setIsModalTransferirSaldoOpen((prevState) => !prevState);
  }

  return {
    saldos,
    isModalTransferirSaldoOpen,
    queryGetSaldosContas,
    searchBar,
    toggleModalTransferirSaldo,
  };
};
