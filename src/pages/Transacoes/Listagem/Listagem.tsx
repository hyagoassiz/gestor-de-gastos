import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Add } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { TRANSACOES_COLUMNS } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { Filtro } from "./components/Filtro";
import { PageHeader } from "@/components/PageHeader";

export const Listagem: React.FC = () => {
  const listagem = useListagem();

  return (
    <>
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
            Nova Transação
          </Button>
        }
      />

      <Frame>
        {!listagem.queryGetTransacoesPaginado.isLoading && (
          <DataTable
            columns={TRANSACOES_COLUMNS}
            data={mountData(listagem)}
            totalPages={listagem.transacoes?.totalPages}
            textForEmptyData="Nenhuma transação encontrada."
            toolbar={<Filtro filterCount={0} />}
          />
        )}
      </Frame>
    </>
  );
};
