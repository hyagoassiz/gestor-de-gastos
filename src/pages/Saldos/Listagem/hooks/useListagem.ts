import { useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { useForm, UseFormReturn } from "react-hook-form";
import { SaldoConta, SaldoContaParams } from "@/types";
import { queryOptionsGetSaldosContas } from "@/api/Saldos/utils/queryOptionsGetSaldosContas";
import useSearchBar from "@/hooks/useSearchBar";
import { ISeachBar } from "@/interfaces/ISearchBar";
import { useUrlParams } from "@/hooks/useUrlParams";

interface IUseListagemReturn {
  saldos: SaldoConta[] | undefined;
  queryGetSaldosContas: UseQueryResult<SaldoConta[]>;
  filterForm: UseFormReturn<SaldoContaParams>;
  searchBar: ISeachBar;
  handleSubmitFilterForm(): void;
}

export const useListagem = (): IUseListagemReturn => {
  const { setLoading } = useLoading();

  const filterForm = useForm<SaldoContaParams>();

  const { searchBar, textoBusca } = useSearchBar({});

  const { setParams, getParam } = useUrlParams();

  const queryGetSaldosContas = useQuery({
    ...queryOptionsGetSaldosContas({ ativo: getParam("ativo", true) }),
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

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      setParams({
        ativo: !data.ativo,
      });
    })();
  }

  return {
    saldos,
    queryGetSaldosContas,
    filterForm,
    searchBar,
    handleSubmitFilterForm,
  };
};
