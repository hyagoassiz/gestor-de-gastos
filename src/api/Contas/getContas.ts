import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../FirebaseConnection";
import { getCurrentUserOrThrow } from "../getCurrentUserOrThrow";
import { tipoContaOptions } from "../../constants/tipoContaOptions";

export async function getContas(
  payload?: IContaListPayloadApi
): Promise<IContaApi[]> {
  try {
    const currentUser = getCurrentUserOrThrow();

    const conditions = [where("usuario", "==", currentUser.uid)];

    if (typeof payload?.ativo === "boolean") {
      conditions.push(where("ativo", "==", payload.ativo));
    }

    const contasQuery = query(collection(db, "conta"), ...conditions);

    const querySnapshot = await getDocs(contasQuery);

    const contas: IContaApi[] = [];

    querySnapshot.forEach((doc) => {
      const contaData = doc.data() as IContaPayloadApi;

      contas.push({
        id: doc.id,
        nome: contaData.nome,
        tipo: tipoContaOptions.find(
          (tipo) => tipo.id === contaData.tipo
        ) as IContaTypeApi,
        agencia: contaData.agencia,
        conta: contaData.conta,
        ativo: contaData.ativo,
        observacao: contaData.observacao,
        incluirEmSomas: contaData.incluirEmSomas,
        criadoEm: contaData.criadoEm,
        atualizadoEm: contaData.atualizadoEm,
      });
    });

    contas.sort((a, b) => a.nome.localeCompare(b.nome));

    return contas;
  } catch (error) {
    console.error("Erro ao obter contas do usuário:", error);

    throw error;
  }
}
