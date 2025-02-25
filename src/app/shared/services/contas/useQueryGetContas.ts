import { UseQueryOptions } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../FirebaseConnection";
import { IPayloadListarContas } from "./interfaces";
import { useSelector } from "react-redux";
import { IConta, IRootState } from "../../interfaces";

export const KEY_GET_CONTAS = "key-get-contas" as const;

export function useQueryGetContas(
  payload: IPayloadListarContas
): UseQueryOptions<IConta[]> {
  const { uid } = useSelector((state: IRootState) => state.user);
  const validPayload = payload;

  const contas: UseQueryOptions<IConta[]> = {
    queryKey: [KEY_GET_CONTAS, validPayload],
    queryFn: () => queryGetContas(uid, payload),
    refetchOnWindowFocus: false,
  };

  return contas;
}

const queryGetContas = async function (
  usuario: string,
  payload: IPayloadListarContas
): Promise<IConta[]> {
  try {
    const conditions = [where("usuario", "==", usuario)];

    if (payload.ativo && payload.ativo.length > 0) {
      conditions.push(where("ativo", "in", payload.ativo));
    }
    if (payload.tipoConta && payload.tipoConta.length > 0) {
      conditions.push(where("tipoConta", "in", payload.tipoConta));
    }

    const contasQuery = query(collection(db, "conta"), ...conditions);

    const querySnapshot = await getDocs(contasQuery);
    const contas: IConta[] = [];

    querySnapshot.forEach((doc) => {
      const contaData: IConta = doc.data() as IConta;
      const conta: IConta = {
        id: doc.id,
        usuario: contaData.usuario,
        nome: contaData.nome,
        tipoConta: contaData.tipoConta,
        agencia: contaData.agencia,
        conta: contaData.conta,
        ativo: contaData.ativo,
        observacao: contaData.observacao,
        incluirSoma: contaData.incluirSoma,
      };
      contas.push(conta);
    });

    contas.sort((a, b) => a.nome.localeCompare(b.nome));

    return contas;
  } catch (error) {
    console.error("Erro ao obter contas do usuário:", error);
    throw error;
  }
};
