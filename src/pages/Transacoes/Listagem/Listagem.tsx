import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { contasColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { FormProvider } from "react-hook-form";
import { ModalTransacao } from "./components/ModalTransacao";
import { Filtro } from "./components/Filtro";
import { PageHeader } from "@/components/PageHeader";

export const Listagem: React.FC = () => {
  const listagem = useListagem();

  return (
    <FormProvider {...listagem.filterForm}>
      <PageHeader
        title="Transações"
        subTitle="Registre entradas e saídas"
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
          columns={contasColumns}
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

      {listagem.modalTransacaoState.open && (
        <ModalTransacao
          transacao={listagem.modalTransacaoState.transacao}
          isDuplicar={listagem.modalTransacaoState.isDuplicar}
          open={listagem.modalTransacaoState.open}
          onClose={listagem.closeModalTransacao}
        />
      )}
    </FormProvider>
  );
};
