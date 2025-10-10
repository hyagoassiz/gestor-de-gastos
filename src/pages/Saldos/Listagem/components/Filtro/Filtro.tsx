import { Controller, useFormContext } from "react-hook-form";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { FilterDrawer } from "../../../../../components/FilterDrawer";
import { SaldoContaParams } from "@/types";

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
  const filterForm = useFormContext<SaldoContaParams>();

  return (
    <FilterDrawer applyFilter={applyFilter} filterCount={filterCount}>
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
