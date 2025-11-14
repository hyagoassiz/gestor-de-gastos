import { Modal } from "@/components/Modal/Modal";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  ListItemText,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import useModalTransferirSaldo from "./hooks/useModalTransferirSaldo";
import { EnumTipoConta } from "@/types/enums";
import { getAgenciaContaLabel } from "@/utils/getSecondaryText";

interface ModalTransferirSaldoProps {
  open: boolean;
  onClose(): void;
}

export const ModalTransferirSaldo: React.FC<ModalTransferirSaldoProps> = ({
  open,
  onClose,
}) => {
  const {
    contasDestino,
    contasOrigem,
    modalTransferirSaldoForm,
    handleTransferirSaldo,
    handleContaOrigemChange,
  } = useModalTransferirSaldo({
    onClose,
  });

  return (
    <Modal
      title="Transferir saldo entre contas"
      style={{ width: 450 }}
      open={open}
      buttons={
        <>
          <Button onClick={onClose}>Fechar</Button>
          <Button variant="contained" onClick={handleTransferirSaldo}>
            Transferir
          </Button>
        </>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="contaOrigem"
            control={modalTransferirSaldoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="contaOrigem"
                options={contasOrigem ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  handleContaOrigemChange(newValue);
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
                    label="Conta de origem"
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
            name="contaDestino"
            control={modalTransferirSaldoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="contaDestino"
                options={contasDestino ?? []}
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
                    label="Conta de destino"
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
            name="valor"
            control={modalTransferirSaldoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <NumericFormat
                customInput={TextField}
                label="Valor da transferência"
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
