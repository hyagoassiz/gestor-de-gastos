import { PageHeader } from "@/components/PageHeader";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  ListItemText,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useCadastro } from "./hooks/useCadastro";
import { NumericFormat } from "react-number-format";
import { normalizarEspacos } from "@/utils/normalizarEspacos";
import { getAgenciaContaLabel } from "@/utils/getSecondaryText";
import { EnumTipoConta } from "@/types/enums";
import { ActionButtonsRow } from "@/components/ActionsButtonsRow";

export const Cadastro: React.FC = () => {
  const cadastro = useCadastro();

  return (
    <>
      <PageHeader
        title={cadastro.pageTitle}
        breadcrumbs={cadastro.breadcrumbs}
      />

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="nome"
            rules={{ required: true }}
            control={cadastro.objetivoForm.control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                size="small"
                label="Nome do Objetivo"
                fullWidth
                value={field.value ?? ""}
                required
                inputProps={{ maxLength: 100 }}
                error={!!formState.errors.nome}
                onBlur={(e) =>
                  field.onChange(normalizarEspacos(e.target.value))
                }
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="valor"
            control={cadastro.objetivoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <NumericFormat
                customInput={TextField}
                label="Valor do Objetivo"
                fullWidth
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                value={field.value ?? ""}
                onValueChange={(values) => {
                  field.onChange(values.floatValue ?? 0);
                }}
                size="small"
                required
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="conta"
            control={cadastro.objetivoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipo"
                options={cadastro.contas ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                value={field.value ?? null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                renderOption={(props, option) => (
                  <Box component="li" {...props} key={option.id}>
                    <ListItemText
                      primary={option.nome}
                      secondary={`${
                        EnumTipoConta[option.tipoConta]
                      } - ${getAgenciaContaLabel(
                        option.agencia,
                        option.conta
                      )}`}
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
                    label="Conta Associada"
                    required
                    error={!!fieldState.error}
                  />
                )}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="dataConclusao"
            control={cadastro.objetivoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                size="small"
                label="Data"
                type="date"
                fullWidth
                required
                error={!!fieldState.error}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="observacao"
            rules={{ required: false }}
            control={cadastro.objetivoForm.control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="Observação"
                fullWidth
                multiline
                rows={2}
                value={field.value ?? ""}
                inputProps={{ maxLength: 100 }}
                onBlur={(e) =>
                  field.onChange(normalizarEspacos(e.target.value))
                }
              />
            )}
          />
        </Grid>
      </Grid>

      <ActionButtonsRow
        left={
          <Button variant="outlined" onClick={cadastro.handleBack}>
            Cancelar
          </Button>
        }
        right={
          <Button variant="contained" onClick={cadastro.handleSalvar}>
            Salvar
          </Button>
        }
      />
    </>
  );
};
