import { Frame } from "../../../components/Frame";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { proventosColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import ToolbarContainer from "../../../components/ToolbarContainer/ToolbarContainer";
import Header from "../../../components/Header/Header";

export const Listagem: React.FC = () => {
  const { resumos } = useListagem();

  return (
    <>
      <Header title="Resumo" />

      <Frame>
        <ToolbarContainer title={`Ativos`} showTitleDivider showDividers />

        <DataTable
          columns={proventosColumns}
          data={mountData({
            resumos,
          })}
          textForEmptyData="Nenhum ativo encontrado."
        />
      </Frame>
    </>
  );
};
