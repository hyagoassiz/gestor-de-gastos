import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { contasColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import ToolbarContainer from "../../../components/ToolbarContainer/ToolbarContainer";
import Header from "../../../components/Header/Header";
import { FormProvider } from "react-hook-form";
import { Filtro } from "./components/Filtro";
import { ModalTransacao } from "./components/ModalTransacao";

export const Listagem: React.FC = () => {
  const listagem = useListagem();

  return (
    <FormProvider {...listagem.filterForm}>
      <Header
        title="Transações"
        buttons={
          <Filtro
            defaultValue={!listagem.transacaoListPayload.pago}
            filterCount={listagem.filterCount}
            applyFilter={listagem.handleSubmitFilterForm}
          />
        }
      />

      <Frame>
        <ToolbarContainer
          title={`Registros (${listagem.transacoes?.totalElements ?? 0})`}
          showTitleDivider
          showDividers
          buttons={
            <>
              <Button
                startIcon={<Add />}
                color="primary"
                variant="outlined"
                onClick={listagem.handleAdicionarTransacao}
              >
                NOVA
              </Button>
            </>
          }
        />

        <DataTable
          columns={contasColumns}
          data={mountData(listagem)}
          page={(listagem.transacoes?.number ?? 0) + 1}
          totalPages={listagem.transacoes?.totalPages}
          onPageChange={(newPage) => listagem.handleChangePage(newPage - 1)}
          textForEmptyData="Nenhuma conta encontrada."
        />
      </Frame>

      {listagem.modalTransacaoState.open && (
        <ModalTransacao
          transacao={listagem.modalTransacaoState.transacao}
          open={listagem.modalTransacaoState.open}
          onClose={listagem.closeModalTransacao}
        />
      )}
    </FormProvider>
  );
};
