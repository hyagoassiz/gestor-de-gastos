import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";

export async function deleteProventoById(id: string): Promise<void> {
  try {
    const currentUser = getCurrentUserOrThrow();
    const usuario = currentUser.uid;

    if (!usuario) {
      return;
    }

    const proventoRef = doc(db, "provento", id);

    await deleteDoc(proventoRef);
  } catch (error) {
    console.error("Erro ao deletar provento:", error);
    throw error;
  }
}
