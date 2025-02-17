// import { useContext } from "react";
// import { DashboardContext } from "../context";
// import { ISaldoMesAno } from "../../../../shared/interfaces";

// interface IUseListagem {
//   data: any[];
// }

// const useListagem = (): IUseListagem => {
//   const { saldosMesAno } = useContext(DashboardContext);

//   const data = teste(saldosMesAno ?? []);

//   function teste(saldo: ISaldoMesAno[]): any[] {
//     return saldo
//       .filter((s) => s.incluirEmSomas)
//       .map((s) => ({
//         name: s.mesAno,
//         entradas: s.valores.concluido.entradas,
//         saidas: s.valores.concluido.saidas,
//       }));
//   }

//   return {
//     data,
//   };
// };

// export default useListagem;
