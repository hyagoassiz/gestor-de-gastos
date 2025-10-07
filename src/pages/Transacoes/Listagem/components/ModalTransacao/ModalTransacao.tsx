import { Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";
import { Modal } from "../../../../../components/Modal";
import { useModalTransacao } from "./hooks/useModalTransacao";
import { tipoMovimentacaoOptions } from "../../../../../constants/tipoMovimentacaoOptions";
import { NumericFormat } from "react-number-format";
import { Transacao } from "@/types";
import { getSituacaoTransacao } from "../../utils/getSituacaoTransacao";

interface IModalTransacaoProps {
  transacao: Transacao | null;
  isDuplicar: boolean;
  open: boolean;
  onClose(): void;
}

export const ModalTransacao: React.FC<IModalTransacaoProps> = ({
  transacao,
  isDuplicar,
  open,
  onClose,
}) => {
  const modalTransacao = useModalTransacao({ transacao, isDuplicar, onClose });

  return (
    <Modal
      open={open}
      style={{ width: "auto", height: "auto", minWidth: 480, maxWidth: 600 }}
      title={`${transacao && !isDuplicar ? "Editar " : "Nova "}Transação`}
      buttons={
        <>
          <Button variant="text" onClick={onClose}>
            Fechar
          </Button>
          <Button variant="contained" onClick={modalTransacao.submitContaForm}>
            Salvar
          </Button>
        </>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Controller
            name="tipoMovimentacao"
            control={modalTransacao.transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipoMovimentacao"
                options={tipoMovimentacaoOptions ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue?.id ?? null);
                  if (modalTransacao.transacaoForm.getValues("categoria")?.id) {
                    modalTransacao.transacaoForm.setValue("categoria", null);
                  }
                }}
                value={
                  tipoMovimentacaoOptions.find((o) => o.id === field.value) ??
                  null
                }
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo"
                    required
                    error={!!fieldState.error}
                  />
                )}
                fullWidth
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <Controller
            name="data"
            control={modalTransacao.transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
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
            name="valor"
            control={modalTransacao.transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <NumericFormat
                customInput={TextField}
                label="Valor"
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
                error={!!fieldState.error}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="categoria"
            control={modalTransacao.transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipo"
                options={modalTransacao.categorias ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                value={field.value ?? null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Categoria"
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
            name="conta"
            control={modalTransacao.transacaoForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipo"
                options={modalTransacao.contas ?? []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                value={field.value ?? null}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Conta"
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
            name="observacao"
            rules={{ required: false }}
            control={modalTransacao.transacaoForm.control}
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

        <Grid item xs={6}>
          <Controller
            name="pago"
            control={modalTransacao.transacaoForm.control}
            defaultValue={true}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label={getSituacaoTransacao(
                    modalTransacao.transacaoForm.watch("tipoMovimentacao"),
                    modalTransacao.transacaoForm.watch("pago")
                  )}
                />
              </FormGroup>
            )}
          />
        </Grid>
      </Grid>
    </Modal>
  );
};
