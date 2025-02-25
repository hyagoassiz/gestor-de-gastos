import { UseQueryOptions } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../FirebaseConnection";
import { IPayloadListarCategorias } from "./interfaces";
import { useSelector } from "react-redux";
import { ICategoria, IRootState } from "../../interfaces";

export const KEY_GET_CATEGORIAS = "key-get-categorias" as const;

export function useQueryGetCategorias(
  payload: IPayloadListarCategorias
): UseQueryOptions<ICategoria[]> {
  const { uid } = useSelector((state: IRootState) => state.user);
  const validPayload = payload;

  const categorias: UseQueryOptions<ICategoria[]> = {
    queryKey: [KEY_GET_CATEGORIAS, validPayload],
    queryFn: () => queryGetCategorias(uid, payload),
    refetchOnWindowFocus: false,
  };

  return categorias;
}

const queryGetCategorias = async function (
  usuario: string,
  payload: IPayloadListarCategorias
): Promise<ICategoria[]> {
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
    const categorias: ICategoria[] = [];

    querySnapshot.forEach((doc) => {
      const categoriaData: ICategoria = doc.data() as ICategoria;
      const categoria: ICategoria = {
        id: doc.id,
        usuario: categoriaData.usuario,
        nome: categoriaData.nome,
        tipo: categoriaData.tipo,
        ativo: categoriaData.ativo,
      };
      categorias.push(categoria);
    });

    categorias.sort((a, b) => a.nome.localeCompare(b.nome));

    return categorias;
  } catch (error) {
    console.error("Erro ao obter categorias do usuário:", error);
    throw error;
  }
};
