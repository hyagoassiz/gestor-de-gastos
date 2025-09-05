import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";

export async function getResumoAtivos(
  payload?: IResumoAtivoListPayloadApi
): Promise<IResumoAtivo[]> {
  try {
    const currentUser = getCurrentUserOrThrow();

    // --- Montar condições para buscar ativos ---
    const ativosConditions = [where("usuario", "==", currentUser.uid)];
    if (payload?.ativoIds && payload.ativoIds.length > 0) {
      ativosConditions.push(where("__name__", "in", payload.ativoIds));
      // __name__ => id do documento
    }

    // --- Buscar ativos ---
    const ativosQuery = query(collection(db, "ativo"), ...ativosConditions);
    const ativosSnapshot = await getDocs(ativosQuery);

    const ativosMap = new Map<string, IAtivoResponseApi>();
    ativosSnapshot.forEach((doc) => {
      ativosMap.set(doc.id, {
        id: doc.id,
        ...(doc.data() as Omit<IAtivoResponseApi, "id">),
      });
    });

    // Lista final de ids de ativos que vamos usar
    const ativoIdsFiltrados = Array.from(ativosMap.keys());
    if (ativoIdsFiltrados.length === 0) return [];

    // --- Buscar operações ---
    const operacoesQuery = query(
      collection(db, "operacao"),
      where("usuario", "==", currentUser.uid),
      where("ativoId", "in", ativoIdsFiltrados)
    );
    const operacoesSnapshot = await getDocs(operacoesQuery);

    // --- Buscar proventos ---
    const proventosQuery = query(
      collection(db, "provento"),
      where("usuario", "==", currentUser.uid),
      where("ativoId", "in", ativoIdsFiltrados)
    );
    const proventosSnapshot = await getDocs(proventosQuery);

    // --- Inicializar resumo ---
    const resumoMap = new Map<string, IResumoAtivo>();
    ativoIdsFiltrados.forEach((ativoId) => {
      const ativo = ativosMap.get(ativoId);
      if (ativo) {
        resumoMap.set(ativoId, {
          ativo,
          totalQuantidadeAtual: 0,
          precoMedio: 0,
          totalInvestido: 0,
          totalProventosRecebidos: 0,
        });
      }
    });

    // --- Processar operações ---
    operacoesSnapshot.forEach((doc) => {
      const operacao = doc.data() as IOperacaoPayloadApi;
      const resumo = resumoMap.get(operacao.ativoId);

      if (!resumo) return;

      if (operacao.tipoOperacaoId === "COMPRA") {
        resumo.totalQuantidadeAtual += operacao.quantidade;
        resumo.totalInvestido += operacao.quantidade * operacao.precoUnitario;
      } else if (operacao.tipoOperacaoId === "VENDA") {
        resumo.totalQuantidadeAtual -= operacao.quantidade;
        resumo.totalInvestido -= operacao.quantidade * resumo.precoMedio;
      }

      resumo.precoMedio =
        resumo.totalQuantidadeAtual > 0
          ? resumo.totalInvestido / resumo.totalQuantidadeAtual
          : 0;
    });

    // --- Processar proventos ---
    proventosSnapshot.forEach((doc) => {
      const provento = doc.data() as IProventoPayloadApi;
      const resumo = resumoMap.get(provento.ativoId);

      if (resumo) {
        resumo.totalProventosRecebidos += provento.total ?? 0;
      }
    });

    return Array.from(resumoMap.values());
  } catch (error) {
    console.error("Erro ao obter resumo:", error);
    throw error;
  }
}
