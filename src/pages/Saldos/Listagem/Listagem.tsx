import { Frame } from "../../../components/Frame";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { CONTAS_COLUMNS } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { Filtro } from "./components/Filtro";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ModalTransferirSaldo } from "./components/ModalTransferirSaldo";

export const Listagem: React.FC = () => {
  const listagem = useListagem();

  return (
    <>
      <PageHeader
        title="Saldos"
        rightContent={
          <Button
            startIcon={<Add />}
            color="primary"
            variant="outlined"
            onClick={listagem.toggleModalTransferirSaldo}
          >
            Transferir Saldo
          </Button>
        }
      />

      <Frame>
        {!listagem.queryGetSaldosContas.isLoading && (
          <DataTable
            columns={CONTAS_COLUMNS}
            data={mountData(listagem)}
            disablePagination
            textForEmptyData="Nenhuma saldo de conta encontrado."
            toolbar={<Filtro filterCount={0} />}
          />
        )}
      </Frame>

      {listagem.isModalTransferirSaldoOpen && (
        <ModalTransferirSaldo
          onClose={listagem.toggleModalTransferirSaldo}
          open={listagem.isModalTransferirSaldoOpen}
        />
      )}
    </>
  );
};
