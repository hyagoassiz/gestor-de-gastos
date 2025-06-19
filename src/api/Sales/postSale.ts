import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../FirebaseConnection";

export async function postSale(
  payload: ISaleRegisterApi
): Promise<DocumentReference> {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error("Usuário não está autenticado.");
  }

  const usuario = currentUser.uid;
  const { id, ...updateData } = payload;

  try {
    if (id) {
      const contaRef = doc(db, "venda", id);
      await updateDoc(contaRef, updateData);
      return contaRef;
    } else {
      const newDocRef = await addDoc(collection(db, "venda"), {
        ...updateData,
        usuario,
      });
      return newDocRef;
    }
  } catch (error) {
    console.error("Erro ao persistir venda:", error);
    throw error;
  }
}
