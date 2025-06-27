import { doc, DocumentReference, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";

export async function updateAssetStatus(
  payload: IUpdateAssetStatusPayloadApi
): Promise<DocumentReference> {
  try {
    const { id, ativo } = payload;

    const currentUser = getCurrentUserOrThrow();

    const assetDocRef = doc(db, "ativo", id);

    const assetSnap = await getDoc(assetDocRef);

    if (!assetSnap.exists() || assetSnap.data()?.usuario !== currentUser.uid) {
      throw new Error("Ativo não encontrado.");
    }

    const updatedData = {
      ...assetSnap.data(),
      ativo,
    };

    await updateDoc(assetDocRef, updatedData);

    return assetDocRef;
  } catch (error) {
    console.error("Erro ao alterar a situação do ativo:", error);

    throw error;
  }
}
