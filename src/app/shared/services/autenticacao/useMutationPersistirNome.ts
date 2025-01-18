import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { getAuth, updateProfile } from "firebase/auth";

interface IMutationProps {
  displayName: string;
}

export const useMutationPersistirNome = (): UseMutationResult<
  void,
  unknown,
  IMutationProps
> => {
  return useMutation({
    mutationFn: ({ displayName }: IMutationProps) =>
      queryAlterarNome(displayName),
  });
};

const queryAlterarNome = async function (displayName: string): Promise<void> {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  if (displayName) {
    await updateProfile(user, { displayName });
  }
};
