import { useContext, useMemo } from "react";
import { DashboardContext } from "../../../context";
import { ITotalizador } from "../../../interfaces";

interface IUseTotais {
  totalizador: ITotalizador;
}

const useTotais = (): IUseTotais => {
  const { saldosMesAno } = useContext(DashboardContext);

  const totalizador: ITotalizador = useMemo(() => {
    const concluido: ITotalizador["concluido"] = {
      entradas: 0,
      saidas: 0,
      saldo: 0,
    };

    const pendente: ITotalizador["pendente"] = {
      entradas: 0,
      saidas: 0,
      saldo: 0,
    };

    saldosMesAno?.forEach((saldos) => {
      concluido.entradas += saldos.valores.concluido.entradas;
      concluido.saidas += saldos.valores.concluido.saidas;
      concluido.saldo += saldos.valores.concluido.saldo;

      pendente.entradas += saldos.valores.pendente.entradas;
      pendente.saidas += saldos.valores.pendente.saidas;
      pendente.saldo += saldos.valores.pendente.saldo;
    });

    return { concluido, pendente };
  }, [saldosMesAno]);

  return {
    totalizador,
  };
};

export default useTotais;
