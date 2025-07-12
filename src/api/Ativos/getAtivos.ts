import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";

export async function getAtivos(
  payload?: IAtivoListPayloadApi
): Promise<IAtivoResponseApi[]> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const conditions = [where("usuario", "==", currentUser.uid)];

    if (typeof payload?.ativo === "boolean") {
      conditions.push(where("ativo", "==", payload.ativo));
    }

    const ativosQuery = query(collection(db, "ativo"), ...conditions);

    const querySnapshot = await getDocs(ativosQuery);

    const ativos: IAtivoResponseApi[] = [];

    querySnapshot.forEach((doc) => {
      const ativoData = doc.data() as IAtivoResponseApi;

      ativos.push({
        id: doc.id,
        nome: ativoData.nome,
        sigla: ativoData.sigla,
        tipo: ativoData.tipo,
        ativo: ativoData.ativo,
        observacao: ativoData.observacao,
        createdAt: ativoData.createdAt,
        updatedAt: ativoData.updatedAt,
      });
    });

    ativos.sort((a, b) => a.nome.localeCompare(b.nome));

    return ativos;
  } catch (error) {
    console.error("Erro ao obter ativos do usuário:", error);

    throw error;
  }
}
