import dayjs from "dayjs";
import { ISaldoMesAno, ITransacao } from "../interfaces";
import "dayjs/locale/pt-br";

export function calcularSaldosMesAno(transacoes: ITransacao[]): ISaldoMesAno[] {
  const saldosMap = new Map<string, ISaldoMesAno>();

  transacoes.forEach((transacao) => {
    const { data, tipo, valor, concluido, incluirSoma } = transacao;

    if (!incluirSoma) return;

    const mesAnoCompleto = dayjs(data).locale("pt-br").format("MMMM/YYYY");
    const mesAno =
      mesAnoCompleto.split("/")[0].substring(0, 3) +
      "/" +
      mesAnoCompleto.split("/")[1];

    if (!saldosMap.has(mesAno)) {
      saldosMap.set(mesAno, {
        mesAno,
        valores: {
          concluido: { entradas: 0, saidas: 0, saldo: 0 },
          pendente: { entradas: 0, saidas: 0, saldo: 0 },
        },
      });
    }

    const saldo = saldosMap.get(mesAno)!;
    const categoriaValores = concluido
      ? saldo.valores.concluido
      : saldo.valores.pendente;

    if (tipo === "ENTRADA") {
      categoriaValores.entradas += valor;
    } else {
      categoriaValores.saidas += valor;
    }

    categoriaValores.saldo =
      categoriaValores.entradas - categoriaValores.saidas;
  });

  return Array.from(saldosMap.values());
}
