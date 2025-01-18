import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { updateProfile, User } from "firebase/auth";
import { useSelector } from "react-redux";
import { IRootState } from "../../interfaces";

interface IMutationProps {
  displayName: string;
}

export const useMutationPersistirNome = (): UseMutationResult<
  void,
  unknown,
  IMutationProps
> => {
  const user = useSelector((state: IRootState) => state.user);
  return useMutation({
    mutationFn: ({ displayName }: IMutationProps) =>
      queryAlterarNome(user, displayName),
  });
};

const queryAlterarNome = async function (
  user: User,
  displayName: string
): Promise<void> {
  return await updateProfile(user, { displayName });
};
