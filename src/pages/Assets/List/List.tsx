import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Header } from "../../../components/Header";
import { ToolbarContainer } from "../../../components/ToolbarContainer";
import { Add } from "@mui/icons-material";
import { AssetModal } from "./components/AssetModal";
import { useList } from "./hooks/useList";
import { DataTable } from "../../../components/DataTable/DataTable";
import { assetsColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { DeactivateModal } from "./components/DeactivateModal";
import { FilterDrawer } from "../../../components/FilterDrawer";
import { Controller } from "react-hook-form";

export const List: React.FC = () => {
  const {
    assets,
    assetModalState,
    deactivateModalState,
    filterForm,
    filterCount,
    closeAssetModal,
    closeDeactivateModal,
    handleActivateAsset,
    handleEditAsset,
    handleDeactivateAsset,
    handleSubmitFilterForm,
    openAssetModal,
    setAssetListPayload,
  } = useList();

  return (
    <>
      <Header
        title="Ativos"
        buttons={
          <FilterDrawer
            applyFilter={handleSubmitFilterForm}
            filterCount={filterCount}
          >
            <Controller
              name="ativo"
              control={filterForm.control}
              defaultValue={false}
              render={({ field }) => (
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="info"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    }
                    label="Exibir somente inativos"
                  />
                </FormGroup>
              )}
            />
          </FilterDrawer>
        }
      />

      <Frame>
        <ToolbarContainer
          title={`Ativos`}
          showTitleDivider
          showDividers
          buttons={
            <>
              <Button
                startIcon={<Add />}
                color="primary"
                variant="outlined"
                onClick={openAssetModal}
              >
                Novo
              </Button>
            </>
          }
        />

        <DataTable
          chips={
            filterCount > 0 && (
              <Chip
                label="Inativos"
                onDelete={() => setAssetListPayload({ ativo: true })}
              />
            )
          }
          columns={assetsColumns}
          data={mountData({
            assets,
            handleActivateAsset,
            handleEditAsset,
            handleDeactivateAsset,
          })}
          textForEmptyData="Nenhum ativo encontrado."
        />
      </Frame>

      {assetModalState.open && (
        <AssetModal
          asset={assetModalState.asset}
          open={assetModalState.open}
          onClose={closeAssetModal}
        />
      )}

      {deactivateModalState.open && (
        <DeactivateModal
          open={deactivateModalState.open}
          asset={deactivateModalState.asset}
          onClose={closeDeactivateModal}
        />
      )}
    </>
  );
};
