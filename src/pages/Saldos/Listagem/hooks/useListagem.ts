import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { useForm, UseFormReturn } from "react-hook-form";
import { SaldoConta, SaldoContaParams } from "@/types";
import { queryOptionsGetSaldosContas } from "@/api/Saldos/utils/queryOptionsGetSaldosContas";

interface IUseListagemReturn {
  saldos: SaldoConta[] | undefined;
  queryGetSaldosContas: UseQueryResult<SaldoConta[]>;
  filterForm: UseFormReturn<SaldoContaParams>;
  filterCount: number;
  saldosContasParams: SaldoContaParams;
  handleSubmitFilterForm(): void;
}

export const useListagem = (): IUseListagemReturn => {
  const { setLoading } = useLoading();

  const filterForm = useForm<SaldoContaParams>();

  const [saldosContasParams, setSaldosContasParams] =
    useState<SaldoContaParams>({
      ativo: true,
    });

  const queryGetSaldosContas = useQuery({
    ...queryOptionsGetSaldosContas(saldosContasParams),
  });

  const filterCount: number = saldosContasParams.ativo === true ? 0 : 1;

  const saldos = queryGetSaldosContas.data;

  useEffect(() => {
    setLoading(queryGetSaldosContas.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetSaldosContas.isLoading]);

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      setSaldosContasParams((prevState) => ({
        ...prevState,
        ativo: !data.ativo,
      }));
    })();
  }

  return {
    saldos,
    queryGetSaldosContas,
    filterForm,
    filterCount,
    saldosContasParams,
    handleSubmitFilterForm,
  };
};
