import {
  Autocomplete,
  Button,
  Grid,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import { Modal } from "../../../../../shared/components/Modal/Modal";
import useModalTransferir from "./hooks/useModalTransferir";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

export const ModalTransferir: React.FC = () => {
  const {
    contas,
    modalTransferirForm,
    openModalTransferir,
    handleTransferirSaldo,
    toggleModalTransferir,
  } = useModalTransferir();

  return (
    <Modal
      open={openModalTransferir}
      title="Transferir Saldo"
      style={{ width: "600px" }}
      buttons={
        <>
          <Button
            color="info"
            variant="outlined"
            onClick={toggleModalTransferir}
          >
            Fechar
          </Button>
          <Button
            color="info"
            variant="contained"
            onClick={handleTransferirSaldo}
          >
            Transferir
          </Button>
        </>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            name="data"
            control={modalTransferirForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <TextField
                label="Data de Transferência"
                type="date"
                variant="standard"
                color="info"
                onChange={field.onChange}
                value={field.value ?? ""}
                inputProps={{
                  maxLength: 30,
                }}
                required
                error={!!fieldState.error}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="valor"
            control={modalTransferirForm.control}
            rules={{
              required: true,
              validate: (value) => value > 0,
            }}
            render={({ field, fieldState }) => (
              <NumericFormat
                label="Valor"
                margin="none"
                variant="standard"
                customInput={TextField}
                prefix={"R$ "}
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                decimalScale={2}
                fixedDecimalScale={true}
                value={field.value ?? null}
                onValueChange={(values) => {
                  field.onChange(values.floatValue ?? 0);
                }}
                decimalSeparator=","
                thousandSeparator={"."}
                defaultValue={0}
                required
                color="info"
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="contaOrigem"
            control={modalTransferirForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="contaOrigem"
                options={contas ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                loadingText="Carregando..."
                value={field.value || null}
                noOptionsText="Nenhum resultado encontrado."
                disabled={true}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    color="info"
                    label="De"
                    error={!!fieldState.error}
                    required
                  />
                )}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="contaDestino"
            control={modalTransferirForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="idConta"
                options={contas ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                value={field.value || null}
                noOptionsText="Nenhum resultado encontrado."
                renderOption={(props, option) => (
                  <ListItem {...props} key={option.id}>
                    <ListItemText
                      primary={option.nome}
                      secondary={
                        option.agencia && option.conta
                          ? `Agência ${option.agencia} / Conta ${option.conta}`
                          : ""
                      }
                      secondaryTypographyProps={{ fontSize: "12px" }}
                    />
                  </ListItem>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    color="info"
                    label="Para"
                    error={!!fieldState.error}
                    required
                  />
                )}
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};
