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
import { proventosTypeOptions } from "../../constants/proventosTypeOptions";

export async function getProventos(
  payload?: IProventoListPayloadApi
): Promise<IProventoResponseApi[]> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const conditions = [where("usuario", "==", currentUser.uid)];

    const proventosQuery = query(collection(db, "provento"), ...conditions);

    const querySnapshot = await getDocs(proventosQuery);

    const proventos: IProventoResponseApi[] = [];

    for (const docSnap of querySnapshot.docs) {
      const proventosData = docSnap.data() as IProventoPayloadApi;

      const ativoDoc = await getDoc(doc(db, "ativo", proventosData.ativoId));
      const ativo = ativoDoc.exists()
        ? {
            id: ativoDoc.id,
            ...(ativoDoc.data() as Omit<IAtivoResponseApi, "id">),
          }
        : null;

      proventos.push({
        id: docSnap.id,
        dataPagamento: proventosData.dataPagamento,
        tipoProvento: proventosTypeOptions.find(
          (tipo) => tipo.id === proventosData.tipoProventoId
        ) as IProventoTypeApi,
        ativo,
        observacao: proventosData.observacao,
        quantidade: proventosData.quantidade,
        precoUnitario: proventosData.precoUnitario,
        total: proventosData.total,
        createdAt: proventosData.createdAt ?? "",
        updatedAt: proventosData.updatedAt ?? "",
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
