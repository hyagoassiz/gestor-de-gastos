import { Controller } from "react-hook-form";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { FilterDrawer } from "../../../../../components/FilterDrawer";
import useFiltro from "./hooks/useFiltro";

interface IFiltroProps {
  filterCount: number;
}

export const Filtro: React.FC<IFiltroProps> = ({ filterCount }) => {
  const { filtroForm, handleFiltroFormSubmit } = useFiltro();

  return (
    <FilterDrawer
      applyFilter={handleFiltroFormSubmit}
      filterCount={filterCount}
    >
      <Controller
        name="ativo"
        control={filtroForm.control}
        render={({ field }) => (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox checked={field.value} onChange={field.onChange} />
              }
              label="Exibir somente contas inativas"
            />
          </FormGroup>
        )}
      />
    </FilterDrawer>
  );
};
