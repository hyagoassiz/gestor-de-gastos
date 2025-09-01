import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";
import { tipoOperacaoOptions } from "../../constants/tipoOperacaoOptions";

export async function getOperacoes(
  payload?: IOperacaoListPayloadApi
): Promise<IOperacaoResponseApi[]> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const conditions = [where("usuario", "==", currentUser.uid)];

    if (payload?.ativoIds && payload.ativoIds.length > 0) {
      conditions.push(where("ativoId", "in", payload.ativoIds));
    }

    const operacaoQuery = query(collection(db, "operacao"), ...conditions);
    const operacaoSnapshot = await getDocs(operacaoQuery);

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

    const operacoes: IOperacaoResponseApi[] = [];

    for (const docSnap of operacaoSnapshot.docs) {
      const operacaoData = docSnap.data() as IOperacaoPayloadApi;
      const ativo = ativosMap.get(operacaoData.ativoId) ?? null;

      operacoes.push({
        id: docSnap.id,
        dataOperacao: operacaoData.dataOperacao,
        ativo,
        tipoOperacao: tipoOperacaoOptions.find(
          (tipo) => tipo.id == operacaoData.tipoOperacaoId
        ) as ITipoOperacaoApi,
        quantidade: operacaoData.quantidade,
        precoUnitario: operacaoData.precoUnitario,
        total: operacaoData.total,
        observacao: operacaoData.observacao,
        criadoEm: operacaoData.criadoEm ?? "",
        atualizadoEm: operacaoData.atualizadoEm ?? "",
      });
    }

    operacoes.sort((a, b) => {
      const dateA = a.dataOperacao;
      const dateB = b.dataOperacao;

      if (dateA === dateB) {
        return b.criadoEm.localeCompare(a.criadoEm);
      }

      return b.dataOperacao.localeCompare(a.dataOperacao);
    });

    return operacoes;
  } catch (error) {
    console.error("Erro ao obter operações do usuário:", error);
    throw error;
  }
}
