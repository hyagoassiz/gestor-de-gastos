import { useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { DespesaPorCategoria, Totais, TransacaoMensal } from "@/types";
import { queryOptionsGetTotais } from "@/api/Dashboard/utils/queryOptionsGetTotais";
import { queryOptionsGetTransacaoMensal } from "@/api/Dashboard/utils/queryOptionsGetTransacaoMensal";
import { queryOptionsGetDespesasPorCategoria } from "@/api/Dashboard/utils/queryOptionsGetDespesasPorCategoria";

interface UseListagemReturn {
  despesasPorCategoria: DespesaPorCategoria[] | undefined;
  totais: Totais | undefined;
  transacoesMensais: TransacaoMensal[] | undefined;
  queryGetTotais: UseQueryResult<Totais>;
  queryGetTransacaoMensal: UseQueryResult<TransacaoMensal[]>;
}

export const useListagem = (): UseListagemReturn => {
  const { setLoading } = useLoading();

  const queryGetDespesasPorCategoria = useQuery({
    ...queryOptionsGetDespesasPorCategoria(),
  });

  const queryGetTotais = useQuery({
    ...queryOptionsGetTotais(),
  });

  const queryGetTransacaoMensal = useQuery({
    ...queryOptionsGetTransacaoMensal(),
  });

  const despesasPorCategoria = queryGetDespesasPorCategoria.data;

  const totais = queryGetTotais.data;

  const transacoesMensais = queryGetTransacaoMensal.data;

  useEffect(() => {
    setLoading(queryGetTotais.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetTotais.isLoading]);

  return {
    despesasPorCategoria,
    totais,
    transacoesMensais,
    queryGetTotais,
    queryGetTransacaoMensal,
  };
};
