import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IAutenticacao } from "../../interfaces";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

interface IMutationProps {
  payload: IAutenticacao;
}

export const useMutationCriarEmail = (): UseMutationResult<
  UserCredential,
  unknown,
  IMutationProps
> => {
  return useMutation({
    mutationFn: ({ payload }: IMutationProps) => queryCriarEmail(payload),
  });
};

const queryCriarEmail = async function ({
  auth,
  email,
  password,
}: IAutenticacao): Promise<UserCredential> {
  return await createUserWithEmailAndPassword(auth, email, password);
};
