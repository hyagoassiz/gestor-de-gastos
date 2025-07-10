import { Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Autocomplete,
  Grid,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Modal } from "../../../../../components/Modal";
import { useOperacaoModal } from "./hooks/useOperacaoModal";
import { NumericFormat } from "react-number-format";
import { tipoOperacaoOptions } from "../../../../../constants/tipoOperacaoOptions";
import useCalcularValores from "../../../../../hooks/useCalcularPrecos";

interface IOperacaoModalProps {
  operacao: IOperacaoResponseApi | null;
  open: boolean;
  onClose(): void;
}

export const OperacaoModal: React.FC<IOperacaoModalProps> = ({
  operacao,
  open,
  onClose,
}) => {
  const { assets, operacaoForm, submitIncomeForm } = useOperacaoModal({
    operacao,
    onClose,
  });

  const { calcularValorTotal, calcularValorUnitario } = useCalcularValores();

  return (
    <Modal
      open={open}
      style={{ width: 480, height: "auto", minWidth: 480 }}
      title={`${operacao ? "Editar" : "Nova"} Operação`}
      buttons={
        <>
          <Button variant="text" onClick={onClose}>
            Fechar
          </Button>
          <Button variant="contained" onClick={submitIncomeForm}>
            Salvar
          </Button>
        </>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Controller
            name="dataOperacao"
            control={operacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <TextField
                label="Data"
                type="date"
                color="info"
                fullWidth
                onChange={field.onChange}
                value={field.value ?? ""}
                required
                error={!!fieldState.error}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="tipoOperacao"
            control={operacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipo"
                options={tipoOperacaoOptions ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                value={field.value ?? null}
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo"
                    required
                    fullWidth
                    error={!!fieldState.error}
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="ativo"
            control={operacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="ativo"
                options={assets ?? []}
                getOptionLabel={(option) => option.sigla || ""}
                filterOptions={(options, { inputValue }) =>
                  options.filter((option) => {
                    const search = inputValue.toLowerCase();
                    return (
                      option.sigla?.toLowerCase().includes(search) ||
                      option.nome?.toLowerCase().includes(search)
                    );
                  })
                }
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                value={field.value ?? null}
                noOptionsText="Nenhum resultado encontrado."
                renderOption={(props, option) => (
                  <ListItem {...props} key={option.id}>
                    <ListItemText
                      primary={option.sigla}
                      secondary={option.nome}
                      secondaryTypographyProps={{ fontSize: "12px" }}
                    />
                  </ListItem>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ativo"
                    required
                    fullWidth
                    error={!!fieldState.error}
                  />
                )}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="quantidade"
            control={operacaoForm.control}
            rules={{
              required: true,
              validate: (value) => value > 0,
            }}
            render={({ field, fieldState }) => (
              <NumericFormat
                label="Quantidade"
                customInput={TextField}
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                decimalScale={0}
                fixedDecimalScale
                value={field.value ?? null}
                onValueChange={({ floatValue }, { event }) => {
                  if (event?.isTrusted) {
                    const total = calcularValorTotal(
                      floatValue ?? 0,
                      operacaoForm.getValues("valorUnitario") ?? 0
                    );

                    operacaoForm.setValue("valorTotal", total);
                    field.onChange(floatValue);
                  }
                }}
                decimalSeparator=","
                thousandSeparator="."
                required
                color="info"
                onFocus={(e) => e.target.select()}
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="valorUnitario"
            control={operacaoForm.control}
            rules={{
              required: true,
              validate: (value) => value > 0,
            }}
            render={({ field, fieldState }) => (
              <NumericFormat
                label="Valor Unitário"
                customInput={TextField}
                prefix={"R$ "}
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                decimalScale={2}
                fixedDecimalScale
                value={field.value ?? null}
                onValueChange={({ floatValue }, { event }) => {
                  if (event?.isTrusted) {
                    const total = calcularValorTotal(
                      operacaoForm.getValues("quantidade"),
                      floatValue ?? 0
                    );

                    operacaoForm.setValue("valorTotal", total);

                    field.onChange(floatValue);
                  }
                }}
                decimalSeparator=","
                thousandSeparator="."
                required
                color="info"
                onFocus={(e) => e.target.select()}
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="valorTotal"
            control={operacaoForm.control}
            rules={{
              required: true,
              validate: (value) => value > 0,
            }}
            render={({ field, fieldState }) => (
              <NumericFormat
                label="Valor Total"
                customInput={TextField}
                prefix={"R$ "}
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                decimalScale={2}
                fixedDecimalScale
                value={field.value ?? null}
                onValueChange={({ floatValue }, { event }) => {
                  if (event?.isTrusted) {
                    const valorUnitario = calcularValorUnitario(
                      floatValue ?? 0,
                      operacaoForm.getValues("quantidade")
                    );

                    operacaoForm.setValue("valorUnitario", valorUnitario);

                    field.onChange(floatValue);
                  }
                }}
                decimalSeparator=","
                thousandSeparator="."
                required
                color="info"
                onFocus={(e) => e.target.select()}
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="observacao"
            rules={{ required: false }}
            control={operacaoForm.control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Observação"
                fullWidth
                multiline
                rows={2}
                error={!!formState.errors.observacao}
                inputProps={{ maxLength: 100 }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};
