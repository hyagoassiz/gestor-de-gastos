import { UseQueryOptions } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../FirebaseConnection";
import { IPayloadListarCategorias, IResponseCategoria } from "./interfaces";

export const KEY_GET_CATEGORIAS = "key-get-categorias" as const;

export function useQueryGetCategorias(
  payload: IPayloadListarCategorias
): UseQueryOptions<IResponseCategoria[]> {
  const user: string = "macBMcEnfrOM3ugwOCgbtUt5uAS2";
  const validPayload = payload;

  const categorias: UseQueryOptions<IResponseCategoria[]> = {
    queryKey: [KEY_GET_CATEGORIAS, validPayload],
    queryFn: () => queryGetCategorias(user, payload),
    refetchOnWindowFocus: false,
  };

  return categorias;
}

const queryGetCategorias = async function (
  usuario: string,
  payload: IPayloadListarCategorias
): Promise<IResponseCategoria[]> {
  try {
    const conditions = [where("usuario", "==", usuario)];

    if (payload.ativo && payload.ativo.length > 0) {
      conditions.push(where("ativo", "in", payload.ativo));
    }
    if (payload.tipo && payload.tipo.length > 0) {
      conditions.push(where("tipo", "in", payload.tipo));
    }

    const categoriasQuery = query(collection(db, "categoria"), ...conditions);

    const querySnapshot = await getDocs(categoriasQuery);
    const categorias: IResponseCategoria[] = [];

    querySnapshot.forEach((doc) => {
      const categoriaData = doc.data();
      const categoria: IResponseCategoria = {
        id: doc.id,
        usuario: categoriaData.usuario,
        nome: categoriaData.nome,
        tipo: categoriaData.tipo,
        ativo: categoriaData.ativo,
      };
      categorias.push(categoria);
    });

    return categorias;
  } catch (error) {
    console.error("Erro ao obter categorias do usuário:", error);
    throw error;
  }
};
