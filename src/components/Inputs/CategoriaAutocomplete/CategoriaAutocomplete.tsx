import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useQueryListarCategorias } from "@/services/categorias/hooks/useQueryListarCategorias";
import { CategoriaParams } from "@/types";

interface CategoriaAutocompleteProps<T extends FieldValues> {
  categoriaParams?: CategoriaParams;
  control: Control<T>;
  name: Path<T>;
  disabled?: boolean;
  enabled?: boolean;
  label?: string;
  required?: boolean;
}

export function CategoriaAutocomplete<T extends FieldValues>({
  control,
  name,
  disabled = false,
  enabled = true,
  label = "Categoria",
  required = true,
  categoriaParams = { ativo: true, padrao: false },
}: CategoriaAutocompleteProps<T>) {
  const { data: categorias = [], isLoading } = useQueryListarCategorias(
    categoriaParams,
    { enabled }
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState }) => (
        <Autocomplete
          disablePortal
          options={categorias}
          getOptionLabel={(option) => option.nome ?? ""}
          value={field.value ?? null}
          onChange={(_, newValue) => field.onChange(newValue)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          noOptionsText="Nenhum resultado encontrado."
          loading={isLoading}
          loadingText="Carregando..."
          disabled={disabled}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label={label}
              required={required}
              disabled={disabled}
              error={!!fieldState.error}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
}
