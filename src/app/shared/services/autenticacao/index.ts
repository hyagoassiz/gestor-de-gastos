import { useMutationLogin } from "./useMutationLogin";
import { useMutationCriarEmail } from "./useMutationCriarEmail";
import { useMutationPersistirNome } from "./useMutationPersistirNome";

export const autenticacaoService = {
  useMutationLogin,
  useMutationCriarEmail,
  useMutationPersistirNome,
};
