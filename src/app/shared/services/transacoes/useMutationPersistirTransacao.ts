import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { db } from "../../../../FirebaseConnection";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  updateDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../redux/snackBar/actions";
import { IRootState } from "../../interfaces";
import { IPayloadPersistirTransacao } from "./interfaces";

interface IMutationProps {
  payload: IPayloadPersistirTransacao;
}

export const useMutationPersistirTransacao = (): UseMutationResult<
  DocumentReference,
  unknown,
  IMutationProps
> => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: IRootState) => state.user);
  return useMutation({
    mutationFn: ({ payload }: IMutationProps) =>
      mutatePersistirTransacao(uid, payload),
    onError: (error) => {
      dispatch(showSnackbar(String(error), "error"));
    },
  });
};

const mutatePersistirTransacao = async function (
  usuario: string,
  payload: IPayloadPersistirTransacao
): Promise<DocumentReference> {
  const { id, ...updateData } = payload;

  try {
    if (id) {
      const contaRef = doc(db, "transacao", id);

      await updateDoc(contaRef, updateData);
      return contaRef;
    } else {
      const newDocRef = await addDoc(collection(db, "transacao"), {
        ...updateData,
        usuario,
      });
      return newDocRef;
    }
  } catch (error) {
    console.error("Erro ao persistir transação:", error);
    throw error;
  }
};
