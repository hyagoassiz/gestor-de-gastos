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

export async function postConta(
  payload: IContaPayloadApi
): Promise<DocumentReference> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const usuario = currentUser.uid;

    const { id, ...atualizadoEm } = payload;

    if (id) {
      const contaRef = doc(db, "conta", id);

      const existingDoc = await getDoc(contaRef);

      if (!existingDoc.exists()) {
        throw new Error("Conta não encontrada.");
      }

      const currentData = existingDoc.data();

      await updateDoc(contaRef, {
        ...atualizadoEm,
        ativo: currentData.ativo,
      });

      return contaRef;
    }

    const newDocRef = await addDoc(collection(db, "conta"), {
      ...atualizadoEm,
      ativo: true,
      usuario,
    });

    return newDocRef;
  } catch (error) {
    console.error("Erro ao persistir conta:", error);

    throw error;
  }
}
