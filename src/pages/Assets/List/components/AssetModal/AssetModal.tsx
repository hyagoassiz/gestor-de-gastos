import { Controller } from "react-hook-form";
import { Box, TextField, Button, Autocomplete } from "@mui/material";
import { Modal } from "../../../../../components/Modal";
import { useAssetModal } from "./hooks/useAssetModal";
import { assetTypeOptions } from "../../../../../constants/assetTypeOptions";

interface IAsseModalProps {
  asset: IAssetResponseApi | null;
  open: boolean;
  onClose(): void;
}

export const AssetModal: React.FC<IAsseModalProps> = ({
  asset,
  open,
  onClose,
}) => {
  const { assetForm, submitAssetForm } = useAssetModal({ asset, onClose });

  return (
    <Modal
      open={open}
      style={{ width: "auto", height: "auto", minWidth: 480 }}
      title={`Ativo`}
      buttons={
        <>
          <Button variant="text" onClick={onClose}>
            Fechar
          </Button>
          <Button variant="contained" onClick={submitAssetForm}>
            Salvar
          </Button>
        </>
      }
    >
      <Box display="flex" flexDirection="column" gap={3}>
        <Controller
          name="nome"
          control={assetForm.control}
          rules={{ required: true }}
          render={({ field, formState }) => (
            <TextField
              {...field}
              label="Nome"
              fullWidth
              required
              error={!!formState.errors.nome}
              inputProps={{ maxLength: 50 }}
            />
          )}
        />

        <Controller
          name="sigla"
          rules={{ required: true }}
          control={assetForm.control}
          render={({ field, formState }) => (
            <TextField
              {...field}
              label="Sigla"
              fullWidth
              required
              onChange={(e) => {
                const valueSemEspaco = e.target.value
                  .replace(/\s/g, "")
                  .toUpperCase();
                field.onChange(valueSemEspaco);
              }}
              value={field.value?.toUpperCase() || ""}
              error={!!formState.errors.sigla}
              inputProps={{ maxLength: 10 }}
            />
          )}
        />

        <Controller
          name="tipo"
          control={assetForm.control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Autocomplete
              disablePortal
              id="status"
              options={assetTypeOptions ?? []}
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
                  error={!!fieldState.error}
                />
              )}
              fullWidth
            />
          )}
        />

        <Controller
          name="observacao"
          rules={{ required: false }}
          control={assetForm.control}
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
