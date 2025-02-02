import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ITransacao } from "../../interfaces";
import { deleteDoc, doc, DocumentReference } from "firebase/firestore";
import { db } from "../../../../FirebaseConnection";

interface IMutationProps {
  payload: ITransacao;
}

export const useMutationExcluirTransacao = (): UseMutationResult<
  DocumentReference,
  unknown,
  IMutationProps
> => {
  return useMutation({
    mutationFn: ({ payload }: IMutationProps) => queryExcluirTransacao(payload),
  });
};

const queryExcluirTransacao = async function (
  payload: ITransacao
): Promise<DocumentReference> {
  try {
    const { id } = payload;

    const transacaoRef = doc(db, "transacao", id);

    await deleteDoc(transacaoRef);

    return transacaoRef;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
