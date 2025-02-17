import { useQueryGetTransacoes } from "./useQueryGetTransacoes";
import { useMutationPersistirTransacao } from "./useMutationPersistirTransacao";
import { useMutationExcluirTransacao } from "./useMutationExcluirTransacao";

export const transacoesService = {
  useQueryGetTransacoes,
  useMutationPersistirTransacao,
  useMutationExcluirTransacao,
};
