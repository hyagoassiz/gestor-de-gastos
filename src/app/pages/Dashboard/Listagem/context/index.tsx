import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ISaldoMesAno } from "../../../../shared/interfaces";
import { IPayloadListarTransacoes } from "../../../../shared/services/transacoes/interfaces";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { transacoesService } from "../../../../shared/services/transacoes";
import { setLoading } from "../../../../shared/redux/loading/actions";
import { calcularSaldosMesAno } from "../../../../shared/utils/calcularSaldosMesAno";

interface IDashboardContextProps {
  children: ReactNode;
}

interface IDashboardContextData {
  saldosMesAno: ISaldoMesAno[] | undefined;
  filtroData: IPayloadListarTransacoes;
  queryGetTransacoes: UseQueryResult;
  setFiltroData: Dispatch<SetStateAction<IPayloadListarTransacoes>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const DashboardContext = createContext({} as IDashboardContextData);

export function DashboardProvider({
  children,
}: IDashboardContextProps): JSX.Element {
  const [filtroData, setFiltroData] = useState<IPayloadListarTransacoes>({
    concluido: [true, false],
    tipo: ["ENTRADA", "SAIDA"],
  });

  const dispatch = useDispatch();

  const queryGetTransacoes = useQuery({
    ...transacoesService.useQueryGetTransacoes(filtroData),
  });

  const saldosMesAno: ISaldoMesAno[] | undefined = useMemo(() => {
    return calcularSaldosMesAno(queryGetTransacoes.data ?? []);
  }, [queryGetTransacoes.data]);

  console.log(saldosMesAno);

  useEffect(() => {
    dispatch(setLoading(queryGetTransacoes.isLoading));
  }, [queryGetTransacoes.isLoading]);

  return (
    <DashboardContext.Provider
      value={{
        saldosMesAno,
        filtroData,
        queryGetTransacoes,
        setFiltroData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
