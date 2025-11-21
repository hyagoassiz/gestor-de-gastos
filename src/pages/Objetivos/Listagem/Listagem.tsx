import { GoalCard } from "@/components/GoalCard";
import { PageHeader } from "@/components/PageHeader";
import { Add } from "@mui/icons-material";
import { Button, MenuItem } from "@mui/material";
import useListagem from "./hooks/useListagem";
import { ModalObjetivo } from "./components/ModalObjetivo";
import { MoreOptions } from "@/components/MoreOptions";

export const Listagem: React.FC = () => {
  const listagem = useListagem();

  return (
    <>
      <PageHeader
        title="Objetivos"
        rightContent={
          <Button
            startIcon={<Add />}
            color="primary"
            variant="outlined"
            onClick={listagem.openModalObjetivo}
          >
            Novo Objetivo
          </Button>
        }
      />

      <GoalCard
        titulo="Comprar carro"
        dataConclusao="2020-10-10"
        percentual={50}
        valorEsperado={30000}
        valorAtual={15000}
        moreOptions={
          <div>
            <MoreOptions>
              {({ handleClose }) => (
                <div>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Editar
                  </MenuItem>
                </div>
              )}
            </MoreOptions>
          </div>
        }
      />

      {listagem.modalObjetivoOpen && (
        <ModalObjetivo
          open={listagem.modalObjetivoOpen}
          onClose={listagem.closeModalObjetivo}
        />
      )}
    </>
  );
};
