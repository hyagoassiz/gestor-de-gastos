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
import { incomeTypeOptions } from "../../constants/incomeTypeOptions";

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
        dataPagamento: incomeData.dataPagamento,
        tipoProvento: incomeTypeOptions.find(
          (tipo) => tipo.id === incomeData.tipoProventoId
        ) as IIncomeTypeApi,
        ativo,
        observacao: incomeData.observacao,
        quantidade: incomeData.quantidade,
        precoUnitario: incomeData.precoUnitario,
        total: incomeData.total,
        createdAt: incomeData.createdAt ?? "",
        updatedAt: incomeData.updatedAt ?? "",
      });
    }

    proventos.sort((a, b) => {
      const dateA = a.dataPagamento;
      const dateB = b.dataPagamento;

      if (dateA === dateB) {
        return b.createdAt.localeCompare(a.createdAt);
      }

      return b.dataPagamento.localeCompare(a.dataPagamento);
    });

    return proventos;
  } catch (error) {
    console.error("Erro ao obter proventos do usuário:", error);
    throw error;
  }
}
