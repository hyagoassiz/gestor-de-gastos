import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";

export async function deleteOperacaoById(id: string): Promise<void> {
  try {
    const currentUser = getCurrentUserOrThrow();
    const usuario = currentUser.uid;

    if (!usuario) {
      return;
    }

    const operacaoRef = doc(db, "operacao", id);

    await deleteDoc(operacaoRef);
  } catch (error) {
    console.error("Erro ao deletar operação:", error);
    throw error;
  }
}
