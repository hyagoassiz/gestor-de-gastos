import { Frame } from "../../../components/Frame";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { CONTAS_COLUMNS } from "./constants/constants";
import { mountData } from "./utils/mountData";
import ToolbarContainer from "../../../components/ToolbarContainer/ToolbarContainer";
import Header from "../../../components/Header/Header";
import { FormProvider } from "react-hook-form";
import { Filtro } from "./components/Filtro";

export const Listagem: React.FC = () => {
  const listagem = useListagem();

  return (
    <FormProvider {...listagem.filterForm}>
      <Header
        title="Saldos"
        buttons={
          <Filtro
            filterCount={0}
            applyFilter={listagem.handleSubmitFilterForm}
            defaultValue={!listagem.saldosContasParams.ativo}
          />
        }
      />

      <Frame>
        <ToolbarContainer
          title={`Registros (${listagem.saldos?.length ?? 0})`}
          showTitleDivider
          showDividers
        />

        <DataTable
          columns={CONTAS_COLUMNS}
          data={mountData(listagem)}
          disablePagination
          textForEmptyData="Nenhuma conta encontrada."
        />
      </Frame>
    </FormProvider>
  );
};
