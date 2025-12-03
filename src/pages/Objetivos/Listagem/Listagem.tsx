import { GoalCard } from "@/components/GoalCard";
import { PageHeader } from "@/components/PageHeader";
import { Add } from "@mui/icons-material";
import { Button, MenuItem } from "@mui/material";
import useListagem from "./hooks/useListagem";
import { MoreOptions } from "@/components/MoreOptions";

export const Listagem: React.FC = () => {
  const listagem = useListagem();

  return (
    <>
      <PageHeader
        title="Objetivos"
        breadcrumbs={[{ label: "Objetivos" }]}
        rightContent={
          <Button
            startIcon={<Add />}
            color="primary"
            variant="outlined"
            onClick={listagem.handleAdicionarObjetivo}
          >
            Novo Objetivo
          </Button>
        }
      />

      {listagem.objetivos?.map((objetivo) => (
        <GoalCard
          titulo={objetivo.nome}
          dataConclusao={objetivo.dataConclusao}
          percentual={objetivo.percentual}
          valorEsperado={objetivo.valorEsperado}
          valorAtual={objetivo.valorAtual}
          moreOptions={
            <div>
              <MoreOptions>
                {({ handleClose }) => (
                  <div>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        listagem.handleEditarObjetivo(objetivo.id);
                      }}
                    >
                      Editar
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleClose();
                        listagem.handleExcluirObjetivo(objetivo.id);
                      }}
                    >
                      Excluir
                    </MenuItem>
                  </div>
                )}
              </MoreOptions>
            </div>
          }
        />
      ))}
    </>
  );
};
