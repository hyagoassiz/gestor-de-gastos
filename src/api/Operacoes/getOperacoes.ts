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

export async function getOperacoes(
  payload?: IOperacaoListPayloadApi
): Promise<IOperacaoResponseApi[]> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const conditions = [where("usuario", "==", currentUser.uid)];

    const operacaoQuery = query(collection(db, "operacao"), ...conditions);

    const querySnapshot = await getDocs(operacaoQuery);

    const operacoes: IOperacaoResponseApi[] = [];

    for (const docSnap of querySnapshot.docs) {
      const operacaoData = docSnap.data() as IOperacaoPayloadApi;

      const ativoDoc = await getDoc(doc(db, "ativo", operacaoData.ativoId));
      const ativo = ativoDoc.exists()
        ? {
            id: ativoDoc.id,
            ...(ativoDoc.data() as Omit<IAssetResponseApi, "id">),
          }
        : null;

      operacoes.push({
        id: docSnap.id,
        dataOperacao: operacaoData.dataOperacao,
        ativo,
        tipoOperacao: operacaoData.tipoOperacao,
        quantidade: operacaoData.quantidade,
        precoUnitario: operacaoData.precoUnitario,
        total: operacaoData.total,
        observacao: operacaoData.observacao,
        createdAt: operacaoData.createdAt ?? "",
        updatedAt: operacaoData.updatedAt ?? "",
      });
    }

    operacoes.sort((a, b) => {
      const dateA = a.dataOperacao;
      const dateB = b.dataOperacao;

      if (dateA === dateB) {
        return b.createdAt.localeCompare(a.createdAt);
      }

      return b.dataOperacao.localeCompare(a.dataOperacao);
    });

    return operacoes;
  } catch (error) {
    console.error("Erro ao obter operações do usuário:", error);
    throw error;
  }
}
