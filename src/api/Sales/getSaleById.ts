import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../FirebaseConnection";

export async function getSaleById(
  idSale: string
): Promise<ISaleRegisterResponseApi> {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    const vendasQuery = query(
      collection(db, "venda"),
      where("usuario", "==", user.uid),
      where("__name__", "==", idSale)
    );

    const querySnapshot = await getDocs(vendasQuery);

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    const venda: ISaleRegisterResponseApi = {
      id: doc.id,
      data: data.data,
      desconto: data.desconto,
      valorTotal: data.valorTotal,
      produtos: data.produtos,
      observacao: data.observacao,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    return venda;
  } catch (error) {
    console.error("Erro ao obter venda:", error);
    throw error;
  }
}
