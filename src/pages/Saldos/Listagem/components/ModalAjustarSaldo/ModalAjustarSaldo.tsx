import { Modal } from "@/components/Modal/Modal";
import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import useModalAjustarSaldo from "./hooks/useModalAjustarSaldo";
import { ModalAjustarSaldoState } from "../../types";

interface ModalAjustarSaldoProps {
  modalAjustarSaldoState: ModalAjustarSaldoState;
  onClose(): void;
}

export const ModalAjustarSaldo: React.FC<ModalAjustarSaldoProps> = ({
  modalAjustarSaldoState,
  onClose,
}) => {
  const modalAjustarSaldo = useModalAjustarSaldo({
    modalAjustarSaldoState,
    onClose,
  });

  return (
    <Modal
      title="Ajuste de saldo"
      style={{ width: 450 }}
      open={modalAjustarSaldoState.isModalOpen}
      buttons={
        <>
          <Button onClick={onClose}>Fechar</Button>
          <Button
            onClick={modalAjustarSaldo.handleAjustarSaldo}
            variant="contained"
          >
            Ajustar
          </Button>
        </>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="conta"
            control={modalAjustarSaldo.ajustarSaldoForm.control}
            render={({ field }) => (
              <Autocomplete
                disablePortal
                id="conta"
                options={[]}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                value={field.value ?? null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                disabled
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Conta" />
                )}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="valorAtual"
            control={modalAjustarSaldo.ajustarSaldoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <NumericFormat
                customInput={TextField}
                label="Novo Saldo"
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
      </Grid>
    </Modal>
  );
};
