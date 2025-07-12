import { doc, DocumentReference, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";

export async function updateAtivoStatus(
  payload: IUpdateAtivoStatusPayloadApi
): Promise<DocumentReference> {
  try {
    const { id, ativo } = payload;

    const currentUser = getCurrentUserOrThrow();

    const ativoDocRef = doc(db, "ativo", id);

    const ativoSnap = await getDoc(ativoDocRef);

    if (!ativoSnap.exists() || ativoSnap.data()?.usuario !== currentUser.uid) {
      throw new Error("Ativo não encontrado.");
    }

    const updatedData = {
      ...ativoSnap.data(),
      ativo,
    };

    await updateDoc(ativoDocRef, updatedData);

    return ativoDocRef;
  } catch (error) {
    console.error("Erro ao alterar a situação do ativo:", error);

    throw error;
  }
}
