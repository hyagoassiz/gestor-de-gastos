import { useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { DespesaPorCategoria, Totais, TransacaoMensal } from "@/types";
import { useQueryListarDespesasPorCategoria } from "@/services/dashboard/hooks/useQueryListarDespesasPorCategoria";
import { useQueryListarTotaisGerais } from "@/services/dashboard/hooks/useQueryListarTotaisGerais";
import { useQueryListarTransacoesMensais } from "@/services/dashboard/hooks/useQueryListarTransacoesMensais";

interface UseListagemReturn {
  despesasPorCategoria: DespesaPorCategoria[] | undefined;
  totais: Totais | undefined;
  transacoesMensais: TransacaoMensal[] | undefined;
  queryListarTotaisGerais: UseQueryResult<Totais>;
  queryListarTransacoesMensais: UseQueryResult<TransacaoMensal[]>;
}

export const useListagem = (): UseListagemReturn => {
  const { setLoading } = useLoading();

  const queryListarDespesasPorCategoria = useQueryListarDespesasPorCategoria();

  const queryListarTotaisGerais = useQueryListarTotaisGerais();

  const queryListarTransacoesMensais = useQueryListarTransacoesMensais();

  const despesasPorCategoria = queryListarDespesasPorCategoria.data;

  const totais = queryListarTotaisGerais.data;

  const transacoesMensais = queryListarTransacoesMensais.data;

  useEffect(() => {
    setLoading(queryListarTotaisGerais.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryListarTotaisGerais.isLoading]);

  return {
    despesasPorCategoria,
    totais,
    transacoesMensais,
    queryListarTotaisGerais,
    queryListarTransacoesMensais,
  };
};
