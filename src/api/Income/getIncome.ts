import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";

export async function getIncome(
  payload?: IIncomeListPayloadApi
): Promise<IIncomeResponseApi[]> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const conditions = [where("usuario", "==", currentUser.uid)];

    const proventosQuery = query(collection(db, "provento"), ...conditions);

    const querySnapshot = await getDocs(proventosQuery);

    const proventos: IIncomeResponseApi[] = [];

    for (const docSnap of querySnapshot.docs) {
      const incomeData = docSnap.data() as IIncomePayloadApi;

      const ativoDoc = await getDoc(doc(db, "ativo", incomeData.ativoId));
      const ativo = ativoDoc.exists()
        ? {
            id: ativoDoc.id,
            ...(ativoDoc.data() as Omit<IAssetResponseApi, "id">),
          }
        : null;

      proventos.push({
        id: docSnap.id,
        dataRecebimento: incomeData.dataRecebimento,
        tipoProvento: incomeData.tipoProvento,
        ativo,
        observacao: incomeData.observacao,
        valor: incomeData.valor,
        createdAt: incomeData.createdAt ?? "",
        updatedAt: incomeData.updatedAt ?? "",
      });
    }

    proventos.sort((a, b) => {
      const dateA = a.dataRecebimento;
      const dateB = b.dataRecebimento;

      if (dateA === dateB) {
        return b.createdAt.localeCompare(a.createdAt);
      }

      return b.dataRecebimento.localeCompare(a.dataRecebimento);
    });

    return proventos;
  } catch (error) {
    console.error("Erro ao obter proventos do usuário:", error);
    throw error;
  }
}
