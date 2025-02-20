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

  const transacoes: UseQueryOptions<ITransacao[]> = {
    queryKey: [KEY_GET_TRANSACOES, validPayload],
    queryFn: () => queryGetTransacoes(uid, payload),
    refetchOnWindowFocus: false,
  };

  return transacoes;
}

const queryGetTransacoes = async function (
  usuario: string,
  payload: IPayloadListarTransacoes
): Promise<ITransacao[]> {
  try {
    const conditions = [where("usuario", "==", usuario)];

    if (payload.concluido) {
      conditions.push(where("concluido", "in", payload.concluido));
    }

    if (payload.tipo && payload.tipo.length > 0) {
      conditions.push(where("tipo", "in", payload.tipo));
    }

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
        nomeCategoria: "",
        idConta: transacaoData.idConta,
        nomeConta: "",
        conta: "",
        agencia: "",
        valor: transacaoData.valor,
        concluido: transacaoData.concluido,
        observacao: transacaoData.observacao,
        incluirSoma: false,
        eTransferencia: transacaoData.eTransferencia,
      };
      transacoes.push(transacao);
    });

    const contasSnapshot = await getDocs(collection(db, "conta"));
    const contaMap = new Map<
      string,
      {
        nomeConta: string;
        conta: string;
        agencia: string;
        incluirSoma: boolean;
      }
    >();

    contasSnapshot.forEach((doc) => {
      const contaData = doc.data() as {
        nome: string;
        conta: string;
        agencia: string;
        incluirSoma: boolean;
      };
      contaMap.set(doc.id, {
        nomeConta: contaData.nome || "",
        conta: contaData.conta || "",
        agencia: contaData.agencia || "",
        incluirSoma: contaData.incluirSoma || false,
      });
    });

    const categoriasSnapshot = await getDocs(collection(db, "categoria"));
    const categoriaMap = new Map<string, string>();

    categoriasSnapshot.forEach((doc) => {
      const categoriaData = doc.data() as { nome: string };
      categoriaMap.set(doc.id, categoriaData.nome || "");
    });

    transacoes.forEach((transacao) => {
      const contaInfo = contaMap.get(transacao.idConta);
      transacao.nomeConta = contaInfo?.nomeConta ?? "";
      transacao.conta = contaInfo?.conta ?? "";
      transacao.agencia = contaInfo?.agencia ?? "";
      transacao.nomeCategoria =
        categoriaMap.get(transacao.idCategoria) ?? "Transferência entre Contas";
      transacao.incluirSoma = contaInfo?.incluirSoma ?? false;
    });

    transacoes.sort((b, a) => a.data.localeCompare(b.data));

    return transacoes;
  } catch (error) {
    console.error("Erro ao obter transacoes:", error);
    throw error;
  }
};
