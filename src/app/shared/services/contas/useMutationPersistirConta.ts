import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { db } from "../../../../FirebaseConnection";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { IPayloadPersistirConta } from "./interfaces";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "../../redux/snackBar/actions";
import { IRootState } from "../../interfaces";

interface IMutationProps {
  payload: IPayloadPersistirConta;
}

export const useMutationPersistirConta = (): UseMutationResult<
  DocumentReference,
  unknown,
  IMutationProps
> => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state: IRootState) => state.user);
  return useMutation({
    mutationFn: ({ payload }: IMutationProps) =>
      mutatePersistirConta(uid, payload),
    onError: (error) => {
      dispatch(showSnackbar(String(error), "error"));
    },
  });
};

const mutatePersistirConta = async function (
  usuario: string,
  payload: IPayloadPersistirConta
): Promise<DocumentReference> {
  const contaRef = collection(db, "conta");

  const q = query(
    contaRef,
    where("usuario", "==", usuario),
    where("nome", "==", payload.nome),
    where("tipoConta", "==", payload.tipoConta)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error("Conta já cadastrada.");
  }

  const { id, ...updateData } = payload;

  try {
    if (id) {
      const contaRef = doc(db, "conta", id);

      await updateDoc(contaRef, updateData);
      return contaRef;
    } else {
      const newDocRef = await addDoc(collection(db, "conta"), {
        ...updateData,
        usuario,
      });
      return newDocRef;
    }
  } catch (error) {
    console.error("Erro ao persistir conta:", error);
    throw error;
  }
};
