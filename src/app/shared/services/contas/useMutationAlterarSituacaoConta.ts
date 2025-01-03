import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { db } from "../../../../FirebaseConnection";
import { doc, DocumentReference, getDoc, updateDoc } from "firebase/firestore";
import { IPayloadAlterarSituacaoConta } from "./interfaces";
import { useSelector } from "react-redux";
import { IRootState } from "../../interfaces";

interface IMutationProps {
  payload: IPayloadAlterarSituacaoConta;
}

export const useMutationAlterarSituacaoConta = (): UseMutationResult<
  DocumentReference,
  unknown,
  IMutationProps
> => {
  const { uid } = useSelector((state: IRootState) => state.user);
  return useMutation({
    mutationFn: ({ payload }: IMutationProps) =>
      mutateAlterarSituacaoConta(uid, payload),
  });
};

export const mutateAlterarSituacaoConta = async function (
  usuario: string,
  payload: IPayloadAlterarSituacaoConta
): Promise<DocumentReference> {
  const { id, ativo } = payload;

  const contaDocRef = doc(db, "conta", id);
  const contaSnap = await getDoc(contaDocRef);

  if (!contaSnap.exists() || contaSnap.data()?.usuario !== usuario) {
    throw new Error("Conta não encontrada.");
  }

  const updatedData = {
    ...contaSnap.data(),
    ativo,
  };

  try {
    await updateDoc(contaDocRef, updatedData);
    return contaDocRef;
  } catch (error) {
    console.error("Erro ao alterar a situação da conta:", error);
    throw error;
  }
};
