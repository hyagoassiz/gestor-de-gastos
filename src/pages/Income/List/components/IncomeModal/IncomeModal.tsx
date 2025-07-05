import { Controller } from "react-hook-form";
import { Box, TextField, Button, Autocomplete } from "@mui/material";
import { Modal } from "../../../../../components/Modal";
import { useIncomeModal } from "./hooks/useIncomeModal";
import { incomeTypeOptions } from "../../../../../constants/incomeTypeOptions";
import { NumericFormat } from "react-number-format";

interface IIncomeModalProps {
  income: IIncomeResponseApi | null;
  open: boolean;
  onClose(): void;
}

export const IncomeModal: React.FC<IIncomeModalProps> = ({
  income,
  open,
  onClose,
}) => {
  const { assets, incomeForm, submitIncomeForm } = useIncomeModal({
    income,
    onClose,
  });

  return (
    <Modal
      open={open}
      style={{ width: "auto", height: "auto", minWidth: 480 }}
      title={`Provento`}
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
      <Box display="flex" flexDirection="column" gap={3}>
        <Controller
          name="dataRecebimento"
          control={incomeForm.control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <TextField
              label="Data de Recebimento"
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

        <Controller
          name="ativo"
          control={incomeForm.control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Autocomplete
              disablePortal
              id="ativo"
              options={assets ?? []}
              getOptionLabel={(option) => option.sigla || ""}
              onChange={(_, newValue) => {
                field.onChange(newValue);
              }}
              value={field.value ?? null}
              noOptionsText="Nenhum resultado encontrado."
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

        <Controller
          name="tipoProvento"
          control={incomeForm.control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Autocomplete
              disablePortal
              id="tipo"
              options={incomeTypeOptions ?? []}
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

        <Controller
          name="valor"
          control={incomeForm.control}
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
              onValueChange={({ floatValue }) => {
                field.onChange(floatValue);
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

        <Controller
          name="observacao"
          rules={{ required: false }}
          control={incomeForm.control}
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
      </Box>
    </Modal>
  );
};
