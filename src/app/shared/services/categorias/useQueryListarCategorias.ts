import { UseQueryOptions } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../FirebaseConnection";
import { IPayloadListarCategorias, IResponseCategoria } from "./interfaces";

export const KEY_LISTAR_CATEGORIAS = "key-listar-categorias" as const;

export function useQueryListarCategorias(
  payload: IPayloadListarCategorias
): UseQueryOptions<IResponseCategoria[]> {
  // const user = useSelector((state: RootState) => state.user);
  const validPayload = payload;

  const categorias: UseQueryOptions<IResponseCategoria[]> = {
    queryKey: [KEY_LISTAR_CATEGORIAS, validPayload],
    queryFn: () =>
      queryListarCategorias("BGhDwReOUNVyxLJ9QVIBNGVzHYc2", payload),
  };

  return categorias;
}

const queryListarCategorias = async function (
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
