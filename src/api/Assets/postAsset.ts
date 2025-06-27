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

export async function postAsset(
  payload: IAssetPayloadApi
): Promise<DocumentReference> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const usuario = currentUser.uid;

    const { id, ...updateData } = payload;

    if (id) {
      const contaRef = doc(db, "ativo", id);

      const existingDoc = await getDoc(contaRef);

      if (!existingDoc.exists()) {
        throw new Error("Ativo não encontrado.");
      }

      const currentData = existingDoc.data();

      await updateDoc(contaRef, {
        ...updateData,
        ativo: currentData.ativo,
      });

      return contaRef;
    }

    const newDocRef = await addDoc(collection(db, "ativo"), {
      ...updateData,
      ativo: true,
      usuario,
    });

    return newDocRef;
  } catch (error) {
    console.error("Erro ao persistir ativo:", error);

    throw error;
  }
}
