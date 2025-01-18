import { useMutationLogin } from "./useMutationLogin";
import { useMutationCriarEmail } from "./useMutationCriarEmail";
import { useMutationPersistirNome } from "./useMutationPersistirNome";
import { useQueryLogOut } from "./useQueryLogOut";

export const autenticacaoService = {
  useMutationLogin,
  useMutationCriarEmail,
  useMutationPersistirNome,
  useQueryLogOut,
};
