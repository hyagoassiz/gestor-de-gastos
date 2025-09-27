import { Controller, useFormContext } from "react-hook-form";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  TextField,
} from "@mui/material";
import { FilterDrawer } from "../../../../../components/FilterDrawer";
import { IContaListPayloadApi } from "../../../../../api/Contas/interfaces/IContaListPayloadApi";
import { tipoContaOptions } from "../../../../../constants/tipoContaOptions";

interface IFiltroProps {
  defaultValue: boolean;
  filterCount: number;
  applyFilter(): void;
}

export const Filtro: React.FC<IFiltroProps> = ({
  filterCount,
  defaultValue,
  applyFilter,
}) => {
  const filterForm = useFormContext<IContaListPayloadApi>();

  return (
    <FilterDrawer applyFilter={applyFilter} filterCount={filterCount}>
      {/* <Controller
        name="tipoConta"
        control={filterForm.control}
        rules={{ required: false }}
        render={({ field, fieldState }) => (
          <Autocomplete
            disablePortal
            id="tipoConta"
            options={tipoContaOptions ?? []}
            getOptionLabel={(option) => option.nome || ""}
            onChange={(_, newValue) => {
              field.onChange(newValue);
            }}
            value={field.value ?? null}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            noOptionsText="Nenhum resultado encontrado."
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de Conta"
                error={!!fieldState.error}
              />
            )}
            fullWidth
          />
        )}
      /> */}

      <Controller
        name="ativo"
        control={filterForm.control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={field.value} onChange={field.onChange} />
              }
              label="Exibir somente inativos"
            />
          </FormGroup>
        )}
      />
    </FilterDrawer>
  );
};
