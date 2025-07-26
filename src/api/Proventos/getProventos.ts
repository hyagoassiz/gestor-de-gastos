import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";
import { proventosTypeOptions } from "../../constants/proventosTypeOptions";

export async function getProventos(
  payload?: IProventoListPayloadApi
): Promise<IProventoResponseApi[]> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const conditions = [where("usuario", "==", currentUser.uid)];

    if (payload?.ativoIds && payload.ativoIds.length > 0) {
      conditions.push(where("ativoId", "in", payload.ativoIds));
    }

    const proventosQuery = query(collection(db, "provento"), ...conditions);
    const proventosSnapshot = await getDocs(proventosQuery);

    const ativosSnapshot = await getDocs(
      query(collection(db, "ativo"), where("usuario", "==", currentUser.uid))
    );

    const ativosMap = new Map<string, IAtivoResponseApi>();
    ativosSnapshot.forEach((doc) => {
      ativosMap.set(doc.id, {
        id: doc.id,
        ...(doc.data() as Omit<IAtivoResponseApi, "id">),
      });
    });

    const proventos: IProventoResponseApi[] = [];

    // 4. Montar os proventos usando o Map
    for (const docSnap of proventosSnapshot.docs) {
      const proventosData = docSnap.data() as IProventoPayloadApi;
      const ativo = ativosMap.get(proventosData.ativoId) ?? null;

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
