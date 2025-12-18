import { Controller, Control, FieldValues, Path } from "react-hook-form";
import {
  Autocomplete,
  Box,
  CircularProgress,
  ListItemText,
  TextField,
} from "@mui/material";
import { ContaParams } from "@/types";
import { useQueryListarContas } from "@/services/contas/hooks/useQueryListarContas";
import { EnumTipoConta } from "@/types/enums";
import { getAgenciaContaLabel } from "@/utils/getSecondaryText";

interface ContaAutocompleteProps<T extends FieldValues> {
  contaParams?: ContaParams;
  control: Control<T>;
  name: Path<T>;
  disabled?: boolean;
  enabled?: boolean;
  label?: string;
  required?: boolean;
}

export function ContaAutocomplete<T extends FieldValues>({
  control,
  name,
  disabled = false,
  enabled = true,
  label = "Conta",
  required = true,
  contaParams = { ativo: true },
}: ContaAutocompleteProps<T>) {
  const { data: contas = [], isLoading } = useQueryListarContas(contaParams, {
    enabled,
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState }) => (
        <Autocomplete
          disablePortal
          options={contas}
          getOptionLabel={(option) => option.nome ?? ""}
          value={field.value ?? null}
          onChange={(_, newValue) => field.onChange(newValue)}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          noOptionsText="Nenhum resultado encontrado."
          loading={isLoading}
          loadingText="Carregando..."
          disabled={disabled}
          fullWidth
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              <ListItemText
                primary={option.nome}
                secondary={`${
                  EnumTipoConta[option.tipoConta]
                } - ${getAgenciaContaLabel(option.agencia, option.conta)}`}
                primaryTypographyProps={{ fontSize: 14 }}
                secondaryTypographyProps={{
                  fontSize: 12,
                  color: "text.secondary",
                }}
              />
            </Box>
          )}
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
