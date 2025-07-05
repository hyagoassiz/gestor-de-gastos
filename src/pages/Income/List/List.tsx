import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Header } from "../../../components/Header";
import { ToolbarContainer } from "../../../components/ToolbarContainer";
import { Add } from "@mui/icons-material";
import { useList } from "./hooks/useList";
import { DataTable } from "../../../components/DataTable/DataTable";
import { incomeColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { DeactivateModal } from "./components/DeactivateModal";
import { IncomeModal } from "./components/IncomeModal";

export const List: React.FC = () => {
  const {
    income,
    incomeModalState,
    deactivateModalState,
    closeIncomeModal,
    closeDeactivateModal,
    handleEditIncome,
    openIncomeModal,
  } = useList();

  return (
    <>
      <Header
        title="Proventos"
        // buttons={
        //   <FilterDrawer
        //     applyFilter={handleSubmitFilterForm}
        //     filterCount={filterCount}
        //   >
        //     <Controller
        //       name="ativoId"
        //       control={filterForm.control}
        //       defaultValue={false}
        //       render={({ field }) => (
        //         <FormGroup>
        //           <FormControlLabel
        //             control={
        //               <Checkbox
        //                 color="info"
        //                 checked={field.value}
        //                 onChange={field.onChange}
        //               />
        //             }
        //             label="Exibir somente inativos"
        //           />
        //         </FormGroup>
        //       )}
        //     />
        //   </FilterDrawer>
        // }
      />

      <Frame>
        <ToolbarContainer
          title={`Proventos`}
          showTitleDivider
          showDividers
          buttons={
            <>
              <Button
                startIcon={<Add />}
                color="primary"
                variant="outlined"
                onClick={openIncomeModal}
              >
                Novo
              </Button>
            </>
          }
        />

        <DataTable
          columns={incomeColumns}
          data={mountData({
            income,
            handleEditIncome,
          })}
          textForEmptyData="Nenhum provento encontrado."
        />
      </Frame>

      {incomeModalState.open && (
        <IncomeModal
          income={incomeModalState.income}
          open={incomeModalState.open}
          onClose={closeIncomeModal}
        />
      )}

      {deactivateModalState.open && (
        <DeactivateModal
          open={deactivateModalState.open}
          income={deactivateModalState.income}
          onClose={closeDeactivateModal}
        />
      )}
    </>
  );
};
