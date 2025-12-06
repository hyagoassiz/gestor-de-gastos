import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { SaldoConta, SearchBar } from "@/types";
import useSearchBar from "@/hooks/useSearchBar";
import { useUrlParams } from "@/hooks/useUrlParams";
import { useQueryListarSaldos } from "@/services/contas/contas.hooks";
import { ModalAjustarSaldoState } from "../types";

interface UseListagemReturn {
  saldos: SaldoConta[] | undefined;
  isModalTransferirSaldoOpen: boolean;
  modalAjustarSaldoState: ModalAjustarSaldoState;
  queryListarSaldos: UseQueryResult<SaldoConta[]>;
  searchBar: SearchBar;
  closeModalAjustarSaldo(): void;
  openModalAjustarSaldo(
    conta: Pick<ModalAjustarSaldoState, "conta">,
    valorAtual: number
  ): void;
  toggleModalTransferirSaldo(): void;
}

export const useListagem = (): UseListagemReturn => {
  const { setLoading } = useLoading();

  const { searchBar, textoBusca } = useSearchBar({});

  const { getParam } = useUrlParams();

  const [isModalTransferirSaldoOpen, setIsModalTransferirSaldoOpen] =
    useState<boolean>(false);
  const [modalAjustarSaldoState, setModalAjustarSaldoState] =
    useState<ModalAjustarSaldoState>({
      conta: null,
      isModalOpen: false,
      valorAtual: 0,
    });

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

  function closeModalAjustarSaldo(): void {
    setModalAjustarSaldoState((prevState) => ({
      ...prevState,
      isModalOpen: false,
    }));
  }

  function openModalAjustarSaldo(
    conta: Pick<ModalAjustarSaldoState, "conta">,
    valorAtual: number
  ): void {
    setModalAjustarSaldoState({
      ...conta,
      valorAtual,
      isModalOpen: true,
    });
  }

  function toggleModalTransferirSaldo(): void {
    setIsModalTransferirSaldoOpen((prevState) => !prevState);
  }

  return {
    saldos,
    isModalTransferirSaldoOpen,
    modalAjustarSaldoState,
    queryListarSaldos,
    searchBar,
    closeModalAjustarSaldo,
    openModalAjustarSaldo,
    toggleModalTransferirSaldo,
  };
};
