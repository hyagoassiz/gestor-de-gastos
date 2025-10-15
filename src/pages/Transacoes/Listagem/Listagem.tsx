import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { TRANSACOES_COLUMNS } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { FormProvider } from "react-hook-form";
import { Filtro } from "./components/Filtro";
import { PageHeader } from "@/components/PageHeader";

export const Listagem: React.FC = () => {
  const listagem = useListagem();

  return (
    <FormProvider {...listagem.filterForm}>
      <PageHeader
        title="Transações"
        breadcrumbs={[{ label: "Transações" }]}
        rightContent={
          <Button
            startIcon={<Add />}
            color="primary"
            variant="outlined"
            onClick={listagem.handleAdicionarTransacao}
          >
            Registrar Transação
          </Button>
        }
      />

      <Frame>
        <DataTable
          columns={TRANSACOES_COLUMNS}
          data={mountData(listagem)}
          page={(listagem.transacoes?.number ?? 0) + 1}
          totalPages={listagem.transacoes?.totalPages}
          onPageChange={(newPage) => listagem.handleChangePage(newPage - 1)}
          textForEmptyData="Nenhuma conta encontrada."
          toolbar={
            <Filtro
              filterCount={0}
              applyFilter={listagem.handleSubmitFilterForm}
            />
          }
        />
      </Frame>
    </FormProvider>
  );
};
