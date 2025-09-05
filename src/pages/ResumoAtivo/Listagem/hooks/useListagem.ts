import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLoading } from "../../../../hooks/useLoading";
import { getQueryOptionsGetResumoAtivos } from "../../../../api/ResumoAtivos/utils/getQueryOptionsGetProventos";

interface IUseListagem {
  resumos: IResumoAtivo[] | undefined;
}

export const useListagem = (): IUseListagem => {
  const { setLoading } = useLoading();

  const queryGetResumoAtivos = useQuery({
    ...getQueryOptionsGetResumoAtivos(),
  });

  const resumos = useMemo(() => {
    return queryGetResumoAtivos.data;
  }, [queryGetResumoAtivos.data]);

  console.log(resumos);

  useEffect(() => {
    setLoading(queryGetResumoAtivos.isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryGetResumoAtivos.isLoading]);

  return {
    resumos,
  };
};
