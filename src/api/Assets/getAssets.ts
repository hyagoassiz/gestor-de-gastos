import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";

export async function getAssets(
  payload?: IAssetListPayloadApi
): Promise<IAssetResponseApi[]> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const conditions = [where("usuario", "==", currentUser.uid)];

    if (typeof payload?.ativo === "boolean") {
      conditions.push(where("ativo", "==", payload.ativo));
    }

    const ativosQuery = query(collection(db, "ativo"), ...conditions);

    const querySnapshot = await getDocs(ativosQuery);

    const ativos: IAssetResponseApi[] = [];

    querySnapshot.forEach((doc) => {
      const assetData = doc.data() as IAssetResponseApi;

      ativos.push({
        id: doc.id,
        nome: assetData.nome,
        sigla: assetData.sigla,
        tipo: assetData.tipo,
        ativo: assetData.ativo,
        observacao: assetData.observacao,
        createdAt: assetData.createdAt,
        updatedAt: assetData.updatedAt,
      });
    });

    ativos.sort((a, b) => a.nome.localeCompare(b.nome));

    return ativos;
  } catch (error) {
    console.error("Erro ao obter ativos do usuário:", error);

    throw error;
  }
}
