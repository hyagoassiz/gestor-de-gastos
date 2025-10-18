import { Controller, useFormContext } from "react-hook-form";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { FilterDrawer } from "../../../../../components/FilterDrawer";
import { CategoriaParamsPaginado } from "@/types";
import { useUrlParams } from "@/hooks/useUrlParams";

interface IFiltroProps {
  filterCount: number;
  applyFilter(): void;
}

export const Filtro: React.FC<IFiltroProps> = ({
  filterCount,
  applyFilter,
}) => {
  const filterForm = useFormContext<CategoriaParamsPaginado>();

  const { getParam } = useUrlParams();

  return (
    <FilterDrawer applyFilter={applyFilter} filterCount={filterCount}>
      <Controller
        name="ativo"
        control={filterForm.control}
        defaultValue={getParam("ativo", false)}
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
