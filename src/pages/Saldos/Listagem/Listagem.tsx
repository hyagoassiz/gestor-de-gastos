import { Frame } from "../../../components/Frame";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { CONTAS_COLUMNS } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { FormProvider } from "react-hook-form";
import { Filtro } from "./components/Filtro";
import { PageHeader } from "@/components/PageHeader";

export const Listagem: React.FC = () => {
  const listagem = useListagem();

  return (
    <FormProvider {...listagem.filterForm}>
      <PageHeader title="Saldos" subTitle="Visualize o saldo de suas contas" />

      <Frame>
        <DataTable
          columns={CONTAS_COLUMNS}
          data={mountData(listagem)}
          disablePagination
          textForEmptyData="Nenhuma conta encontrada."
          toolbar={
            <Filtro
              filterCount={0}
              applyFilter={listagem.handleSubmitFilterForm}
              defaultValue={!listagem.saldosContasParams.ativo}
            />
          }
        />
      </Frame>
    </FormProvider>
  );
};
