import { DataTable } from "../../../shared/components/DataTable/DataTable";
import { TitlePage } from "../../../shared/components/TitlePage/TItlePage";
import { ToolPainel } from "../../../shared/components/ToolPanel/ToolPanel";
import { saldosColumns } from "./constants/constants";
import useListagem from "./hooks/useListagem";
import { mountData } from "./util/mountData";

export const Listagem: React.FC = () => {
  const { saldos, searchBar } = useListagem();

  return (
    <>
      <TitlePage title="Saldos" subTitle="Consulte o saldo de suas contas" />

      <ToolPainel searchBar={searchBar} />

      <DataTable
        columns={saldosColumns}
        data={mountData({
          saldos,
        })}
        textForEmptyData="Nenhuma conta encontrada."
      />
    </>
  );
};
