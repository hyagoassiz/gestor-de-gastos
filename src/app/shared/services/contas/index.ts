import { useQueryGetContas } from "./useQueryGetContas";
import { useMutationAlterarSituacaoConta } from "./useMutationAlterarSituacaoConta";
import { useMutationPersistirConta } from "./useMutationPersistirConta";

export const contasService = {
  useQueryGetContas,
  useMutationAlterarSituacaoConta,
  useMutationPersistirConta,
};
