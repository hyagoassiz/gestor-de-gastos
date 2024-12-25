import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { db } from "../../../../FirebaseConnection";
import { doc, DocumentReference, getDoc, updateDoc } from "firebase/firestore";
import { IPayloadAlterarSituacaoCategoria } from "./interfaces";
import { useSelector } from "react-redux";
import { IRootState } from "../../interfaces";

interface IMutationProps {
  payload: IPayloadAlterarSituacaoCategoria;
}

export const useMutationAlterarSituacaoCategoria = (): UseMutationResult<
  DocumentReference,
  unknown,
  IMutationProps
> => {
  const { uid } = useSelector((state: IRootState) => state.user);
  return useMutation({
    mutationFn: ({ payload }: IMutationProps) =>
      queryAlterarSituacaoCategoria(uid, payload),
  });
};

const queryAlterarSituacaoCategoria = async function (
  usuario: string,
  payload: IPayloadAlterarSituacaoCategoria
): Promise<DocumentReference> {
  const { id, ativo } = payload;

  const categoriaDocRef = doc(db, "categoria", id);
  const categoriaSnap = await getDoc(categoriaDocRef);

  if (!categoriaSnap.exists() || categoriaSnap.data()?.usuario !== usuario) {
    throw new Error("Categoria não encontrada.");
  }

  const updatedData = {
    ...categoriaSnap.data(),
    ativo,
  };

  try {
    await updateDoc(categoriaDocRef, updatedData);
    return categoriaDocRef;
  } catch (error) {
    console.error("Erro ao alterar a situação da categoria:", error);
    throw error;
  }
};
