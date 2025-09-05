import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";

export async function postCategoria(
  payload: ICategoriaPayloadApi
): Promise<DocumentReference> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const usuario = currentUser.uid;

    const { id, ...atualizadoEm } = payload;

    if (id) {
      const contaRef = doc(db, "categoria", id);

      const existingDoc = await getDoc(contaRef);

      if (!existingDoc.exists()) {
        throw new Error("Categoria não encontrada.");
      }

      const currentData = existingDoc.data();

      await updateDoc(contaRef, {
        ...atualizadoEm,
        ativo: currentData.ativo,
      });

      return contaRef;
    }

    const newDocRef = await addDoc(collection(db, "categoria"), {
      ...atualizadoEm,
      ativo: true,
      usuario,
    });

    return newDocRef;
  } catch (error) {
    console.error("Erro ao persistir categoria:", error);

    throw error;
  }
}
