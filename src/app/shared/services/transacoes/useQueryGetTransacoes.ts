import { UseQueryOptions } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../FirebaseConnection";
import { useSelector } from "react-redux";
import { IRootState, ITransacao } from "../../interfaces";
import { IPayloadListarTransacoes } from "./interfaces";

export const KEY_GET_TRANSACOES = "key-get-categorias" as const;

export function useQueryGetTransacoes(
  payload: IPayloadListarTransacoes
): UseQueryOptions<ITransacao[]> {
  const { uid } = useSelector((state: IRootState) => state.user);
  const validPayload = payload;

  const categorias: UseQueryOptions<ITransacao[]> = {
    queryKey: [KEY_GET_TRANSACOES, validPayload],
    queryFn: () => queryGetCategorias(uid, payload),
    refetchOnWindowFocus: false,
  };

  return categorias;
}

const queryGetCategorias = async function (
  usuario: string,
  payload: IPayloadListarTransacoes
): Promise<ITransacao[]> {
  try {
    const conditions = [where("usuario", "==", usuario)];

    if (payload.concluido) {
      conditions.push(where("ativo", "in", payload.concluido));
    }

    // Buscar as transações
    const transacoesQuery = query(collection(db, "transacao"), ...conditions);
    const querySnapshot = await getDocs(transacoesQuery);

    const transacoes: ITransacao[] = [];
    querySnapshot.forEach((doc) => {
      const transacaoData: ITransacao = doc.data() as ITransacao;
      const transacao: ITransacao = {
        id: doc.id,
        usuario: transacaoData.usuario,
        data: transacaoData.data,
        tipo: transacaoData.tipo,
        idCategoria: transacaoData.idCategoria,
        nomeCategoria: transacaoData.nomeCategoria,
        idConta: transacaoData.idConta,
        nomeConta: "", // Será preenchido posteriormente
        conta: "", // Será preenchido posteriormente
        agencia: "", // Será preenchido posteriormente
        valor: transacaoData.valor,
        concluido: transacaoData.concluido,
        incluirSoma: transacaoData.incluirSoma,
      };
      transacoes.push(transacao);
    });

    // Buscar as contas
    const contasSnapshot = await getDocs(collection(db, "conta"));
    const contaMap = new Map<
      string,
      { nomeConta: string; conta: string; agencia: string }
    >();

    contasSnapshot.forEach((doc) => {
      const contaData = doc.data() as {
        nome: string;
        conta: string;
        agencia: string;
      };
      contaMap.set(doc.id, {
        nomeConta: contaData.nome || "Conta Desconhecida",
        conta: contaData.conta || "Não Informado",
        agencia: contaData.agencia || "Não Informada",
      });
    });

    // Atribuir os dados da conta às transações
    transacoes.forEach((transacao) => {
      const contaInfo = contaMap.get(transacao.idConta);
      transacao.nomeConta = contaInfo?.nomeConta ?? "";
      transacao.conta = contaInfo?.conta ?? "";
      transacao.agencia = contaInfo?.agencia ?? "";
    });

    // Ordenar as transações por data
    transacoes.sort((a, b) => a.data.localeCompare(b.data));

    return transacoes;
  } catch (error) {
    console.error("Erro ao obter transacoes e contas:", error);
    throw error;
  }
};
