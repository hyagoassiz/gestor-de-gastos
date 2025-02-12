import { ISaldoMesAno, ITransacao } from "../interfaces";

export interface ISaldo {
  mesAno: string;
  incluirEmSomas: boolean;
  valores: {
    concluido: {
      entradas: number;
      saidas: number;
      saldo: number;
    };
    pendente: {
      entradas: number;
      saidas: number;
      saldo: number;
    };
  };
}

export function calcularSaldosMesAno(transacoes: ITransacao[]): ISaldoMesAno[] {
  const saldosMap = new Map<string, ISaldoMesAno>();

  transacoes.forEach((transacao) => {
    const { data, tipo, valor, concluido, incluirSoma } = transacao;
    const mesAno = data.slice(0, 7); // Extrai "YYYY-MM" da data

    if (!saldosMap.has(mesAno)) {
      saldosMap.set(mesAno, {
        mesAno,
        incluirEmSomas: incluirSoma ?? true,
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
