import { useEffect } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { ResumoDashboard } from "@/types";
import { queryOptionsGetResumoDashboard } from "@/api/Dashboard/utils/queryOptionsGetSaldosContas";

interface IUseListagemReturn {
  resumo: ResumoDashboard | undefined;
  queryGetResumoDashboard: UseQueryResult<ResumoDashboard>;
}

export const useListagem = (): IUseListagemReturn => {
  const { setLoading } = useLoading();

  const queryGetResumoDashboard = useQuery({
    ...queryOptionsGetResumoDashboard(),
  });

  const resumo = queryGetResumoDashboard.data;

  useEffect(() => {
    setLoading(queryGetResumoDashboard.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetResumoDashboard.isLoading]);

  return {
    resumo,
    queryGetResumoDashboard,
  };
};
