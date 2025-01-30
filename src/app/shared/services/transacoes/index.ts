import { useQueryGetTransacoes } from "./useQueryGetTransacoes";
import { useMutationPersistirTransacao } from "./useMutationPersistirTransacao";

export const transacoesService = {
  useQueryGetTransacoes,
  useMutationPersistirTransacao,
};
