import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { IAutenticacao } from "../../interfaces";

interface IMutationProps {
  payload: IAutenticacao;
}

export const useMutationLogin = (): UseMutationResult<
  UserCredential,
  unknown,
  IMutationProps
> => {
  return useMutation({
    mutationFn: ({ payload }: IMutationProps) => queryLogin(payload),
  });
};

const queryLogin = async function ({
  auth,
  email,
  password,
}: IAutenticacao): Promise<UserCredential> {
  return await signInWithEmailAndPassword(auth, email, password);
};
