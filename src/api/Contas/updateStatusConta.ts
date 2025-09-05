import { doc, DocumentReference, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";

export async function updateStatusConta(
  payload: IUpdateStatusContaPayloadApi
): Promise<DocumentReference> {
  try {
    const { id, ativo } = payload;

    const currentUser = getCurrentUserOrThrow();

    const contaDocRef = doc(db, "conta", id);

    const contaSnap = await getDoc(contaDocRef);

    if (!contaSnap.exists() || contaSnap.data()?.usuario !== currentUser.uid) {
      throw new Error("Conta não encontrada.");
    }

    const updatedData = {
      ...contaSnap.data(),
      ativo,
    };

    await updateDoc(contaDocRef, updatedData);

    return contaDocRef;
  } catch (error) {
    console.error("Erro ao alterar a situação da conta:", error);

    throw error;
  }
}
