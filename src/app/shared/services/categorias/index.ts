import { useQueryGetCategorias } from "./useQueryGetCategorias";
import { useMutationPersistirCategoria } from "./useMutationPersistirCategoria";
import { useMutationAlterarSituacaoCategoria } from "./useMutationAlterarSituacaoCategoria";

export const categoriasService = {
  useQueryGetCategorias,
  useMutationPersistirCategoria,
  useMutationAlterarSituacaoCategoria,
};
