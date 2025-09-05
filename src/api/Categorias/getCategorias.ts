import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";
import { tipoCategoriaOptions } from "../../constants/tipoCategoriaOptions";

export async function getCategorias(
  payload?: ICategoriaListPayloadApi
): Promise<ICategoriaApi[]> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const conditions = [where("usuario", "==", currentUser.uid)];

    if (typeof payload?.ativo === "boolean") {
      conditions.push(where("ativo", "==", payload.ativo));
    }

    const categoriasQuery = query(collection(db, "categoria"), ...conditions);

    const querySnapshot = await getDocs(categoriasQuery);

    const categorias: ICategoriaApi[] = [];

    querySnapshot.forEach((doc) => {
      const contaData = doc.data() as ICategoriaPayloadApi;

      categorias.push({
        id: doc.id,
        nome: contaData.nome,
        tipo: tipoCategoriaOptions.find(
          (tipo) => tipo.id === contaData.tipo
        ) as ICategoriaTypeApi,
        ativo: contaData.ativo,
        observacao: contaData.observacao,
        criadoEm: contaData.criadoEm,
        atualizadoEm: contaData.atualizadoEm,
      });
    });

    categorias.sort((a, b) => a.nome.localeCompare(b.nome));

    return categorias;
  } catch (error) {
    console.error("Erro ao obter categorias do usuário:", error);

    throw error;
  }
}
