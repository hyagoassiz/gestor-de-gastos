import {
  collection,
  doc,
  DocumentReference,
  writeBatch,
} from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";

export async function postOperacaoEmLote(
  payload: IOperacaoEmLotePayloadApi[]
): Promise<DocumentReference[]> {
  const currentUser = getCurrentUserOrThrow();
  const usuario = currentUser.uid;

  const batch = writeBatch(db);
  const refs: DocumentReference[] = [];

  payload.forEach((_payload) => {
    const docRef = doc(collection(db, "operacao"));
    refs.push(docRef);

    batch.set(docRef, { ..._payload, usuario });
  });

  try {
    await batch.commit();
    return refs;
  } catch (error) {
    console.error("Erro ao persistir operações em lote:", error);
    throw error;
  }
}
