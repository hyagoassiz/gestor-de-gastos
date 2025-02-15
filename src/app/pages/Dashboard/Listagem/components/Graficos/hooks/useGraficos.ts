import { useContext } from "react";
import { ISaldoMesAno } from "../../../../../../shared/interfaces";
import { DashboardContext } from "../../../context";
import "dayjs/locale/pt-br";

interface IUseGraficos {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data1: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data2: any[];
}

const useGraficos = (): IUseGraficos => {
  const { saldosMesAno } = useContext(DashboardContext);

  const data = teste(saldosMesAno ?? [], true);
  const data1 = teste(saldosMesAno ?? [], false);

  const data2 = formatarDadosParaGrafico(saldosMesAno ?? []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function teste(saldo: ISaldoMesAno[], pago: boolean): any[] {
    return saldo
      .sort((a, b) => {
        const [mesA, anoA] = a.mesAno.split("/");
        const [mesB, anoB] = b.mesAno.split("/");

        const dataA = new Date(Number(anoA), getMesIndex(mesA));
        const dataB = new Date(Number(anoB), getMesIndex(mesB));

        return dataA.getTime() - dataB.getTime();
      })
      .filter((s) => s.incluirEmSomas)
      .map((s) => ({
        name: s.mesAno,
        entradas: pago
          ? s.valores.concluido.entradas
          : s.valores.pendente.entradas,
        saidas: pago ? s.valores.concluido.saidas : s.valores.pendente.saidas,
        saldo: pago ? s.valores.concluido.saldo : s.valores.pendente.saldo,
      }));
  }

  function getMesIndex(mes: string): number {
    const meses = [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];
    return meses.indexOf(mes.toLowerCase());
  }

  function formatarDadosParaGrafico(saldos: ISaldoMesAno[]) {
    let patrimonioAcumulado = 0;

    // saldos.sort((b, a) => a.mesAno.localeCompare(b.mesAno));

    return saldos
      .filter((s) => s.incluirEmSomas)
      .map((s) => {
        patrimonioAcumulado += s.valores.concluido.saldo;

        return {
          name: s.mesAno,
          patrimonio: patrimonioAcumulado,
        };
      });
  }

  return {
    data,
    data1,
    data2,
  };
};

export default useGraficos;
