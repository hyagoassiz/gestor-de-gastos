import { doc, DocumentReference, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";

export async function updateStatusCategoria(
  payload: IUpdateStatusCategoriaPayloadApi
): Promise<DocumentReference> {
  try {
    const { id, ativo } = payload;

    const currentUser = getCurrentUserOrThrow();

    const categoriaRef = doc(db, "categoria", id);

    const categoriaSnap = await getDoc(categoriaRef);

    if (
      !categoriaSnap.exists() ||
      categoriaSnap.data()?.usuario !== currentUser.uid
    ) {
      throw new Error("Categoria não encontrada.");
    }

    const updatedData = {
      ...categoriaSnap.data(),
      ativo,
    };

    await updateDoc(categoriaRef, updatedData);

    return categoriaRef;
  } catch (error) {
    console.error("Erro ao alterar a situação da categoria:", error);

    throw error;
  }
}
