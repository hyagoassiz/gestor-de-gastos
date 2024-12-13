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
import { IPayloadPersistirCategoria } from "./interfaces";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/snackBar/actions";

interface IMutationProps {
  payload: IPayloadPersistirCategoria;
}

export const useMutationPersistirCategoria = (): UseMutationResult<
  DocumentReference,
  unknown,
  IMutationProps
> => {
  const user: string = "macBMcEnfrOM3ugwOCgbtUt5uAS2";
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: ({ payload }: IMutationProps) =>
      queryPersistirCategoria(user, payload),
    onError: (error) => {
      dispatch(showSnackbar(String(error), "error"));
    },
  });
};

const queryPersistirCategoria = async function (
  usuario: string,
  payload: IPayloadPersistirCategoria
): Promise<DocumentReference> {
  const categoriaRef = collection(db, "categoria");

  const q = query(
    categoriaRef,
    where("usuario", "==", usuario),
    where("nome", "==", payload.nome),
    where("tipo", "==", payload.tipo)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error("Categoria já cadastrada.");
  }

  const { id, ...updateData } = payload;

  try {
    if (id) {
      const contaRef = doc(db, "categoria", id);

      await updateDoc(contaRef, updateData);
      return contaRef;
    } else {
      const newDocRef = await addDoc(collection(db, "categoria"), {
        ...updateData,
        usuario,
      });
      return newDocRef;
    }
  } catch (error) {
    console.error("Erro ao persistir categoria:", error);
    throw error;
  }
};
