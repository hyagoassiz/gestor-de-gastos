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

export async function postOperacao(
  payload: IOperacaoPayloadApi
): Promise<DocumentReference> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const usuario = currentUser.uid;

    const { id, ...atualizadoEma } = payload;

    if (id) {
      const operacaoRef = doc(db, "operacao", id);

      const existingDoc = await getDoc(operacaoRef);

      if (!existingDoc.exists()) {
        throw new Error("Operação não encontrado.");
      }

      await updateDoc(operacaoRef, {
        ...atualizadoEma,
      });

      return operacaoRef;
    }

    const newDocRef = await addDoc(collection(db, "operacao"), {
      ...atualizadoEma,
      usuario,
    });

    return newDocRef;
  } catch (error) {
    console.error("Erro ao persistir operação:", error);

    throw error;
  }
}
