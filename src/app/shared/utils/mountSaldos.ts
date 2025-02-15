import { ISaldo, ITransacao } from "../interfaces";

export const mountSaldos = (transacoes: ITransacao[]): ISaldo[] => {
  const resultado = Object.values(
    transacoes.reduce((acc: { [key: string]: ISaldo }, obj: ITransacao) => {
      if (!acc[obj.conta]) {
        acc[obj.conta] = {
          idConta: obj.conta,
          nomeConta: obj?.nomeConta || "",
          agencia: obj?.agencia || "",
          conta: obj?.conta || "",
          categoria: obj?.nomeCategoria || "",
          incluirEmSomas: obj?.incluirSoma || false,
          valores: {
            concluido: {
              entradas: 0,
              saidas: 0,
              saldo: 0,
            },
            pendente: {
              entradas: 0,
              saidas: 0,
              saldo: 0,
            },
          },
        };
      }

      const valores = acc[obj.conta].valores;

      if (obj.tipo === "ENTRADA") {
        if (obj.concluido) {
          valores.concluido.entradas += obj.valor;
        } else {
          valores.pendente.entradas += obj.valor;
        }
      } else {
        if (obj.concluido) {
          valores.concluido.saidas += obj.valor;
        } else {
          valores.pendente.saidas += obj.valor;
        }
      }

      valores.concluido.saldo =
        valores.concluido.entradas - valores.concluido.saidas;
      valores.pendente.saldo =
        valores.pendente.entradas - valores.pendente.saidas;

      return acc;
    }, {})
  );

  return resultado;
};
