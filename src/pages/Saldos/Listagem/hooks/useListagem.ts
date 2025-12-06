import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { SaldoConta, SearchBar } from "@/types";
import useSearchBar from "@/hooks/useSearchBar";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useQueryListarSaldos } from "@/services/contas/contas.hooks";

interface UseListagemReturn {
  saldos: SaldoConta[] | undefined;
  isModalTransferirSaldoOpen: boolean;
  queryListarSaldos: UseQueryResult<SaldoConta[]>;
  searchBar: SearchBar;
  toggleModalTransferirSaldo(): void;
}

export const useListagem = (): UseListagemReturn => {
  const { setLoading } = useLoading();

  const { searchBar, textoBusca } = useSearchBar({});

  const { getParam } = useUrlParams();

  const [isModalTransferirSaldoOpen, setIsModalTransferirSaldoOpen] =
    useState<boolean>(false);

  const queryListarSaldos = useQueryListarSaldos({
    ativo: getParam("ativo") === "false" ? false : true,
  });

  const saldos =
    queryListarSaldos.data?.filter((saldo) => {
      if (!textoBusca) return true;
      const termo = textoBusca.toLowerCase();
      return (
        saldo.nome.toLowerCase().includes(termo) ||
        saldo.agencia.toLowerCase().includes(termo) ||
        saldo.conta.toLowerCase().includes(termo)
      );
    }) ?? [];

  useEffect(() => {
    setLoading(queryListarSaldos.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryListarSaldos.isLoading]);

  function toggleModalTransferirSaldo(): void {
    setIsModalTransferirSaldoOpen((prevState) => !prevState);
  }

  return {
    saldos,
    isModalTransferirSaldoOpen,
    queryListarSaldos,
    searchBar,
    toggleModalTransferirSaldo,
  };
};
