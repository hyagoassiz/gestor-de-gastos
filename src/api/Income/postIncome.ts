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

export async function postIncome(
  payload: IIncomePayloadApi
): Promise<DocumentReference> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const usuario = currentUser.uid;

    const { id, ...updateData } = payload;

    if (id) {
      const proventoRef = doc(db, "provento", id);

      const existingDoc = await getDoc(proventoRef);

      if (!existingDoc.exists()) {
        throw new Error("Provento não encontrado.");
      }

      await updateDoc(proventoRef, {
        ...updateData,
      });

      return proventoRef;
    }

    const newDocRef = await addDoc(collection(db, "provento"), {
      ...updateData,
      usuario,
    });

    return newDocRef;
  } catch (error) {
    console.error("Erro ao persistir provento:", error);

    throw error;
  }
}
