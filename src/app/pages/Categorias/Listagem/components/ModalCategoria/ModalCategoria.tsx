import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { Modal } from "../../../../../shared/components/Modal/Modal";
import useModalCategoria from "./hooks/useModalCategoria";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { tiposTransacoes } from "../../../../../shared/constants/tiposTransacoes";

export const ModalCategoria: React.FC = () => {
  const {
    categoriaForm,
    categoria,
    openModalCategoria,
    onSubmit,
    toggleModalCategoria,
  } = useModalCategoria();

  const { t } = useTranslation();

  return (
    <Modal
      open={openModalCategoria}
      title={
        !categoria?.id
          ? t("PAGES.CATEGORIAS.MODALS.MODAL_CREATE.ADD")
          : t("PAGES.CATEGORIAS.MODALS.MODAL_CREATE.EDIT")
      }
      style={{ width: "600px" }}
      buttons={
        <>
          <Button
            color="info"
            variant="outlined"
            onClick={toggleModalCategoria}
          >
            {t("BUTTONS.CLOSE")}
          </Button>
          <Button
            color="info"
            variant="contained"
            onClick={categoriaForm.handleSubmit(onSubmit)}
          >
            {t("BUTTONS.SAVE")}
          </Button>
        </>
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Controller
            name="nome"
            control={categoriaForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <TextField
                label="Nome"
                type="text"
                color="info"
                variant="standard"
                onChange={field.onChange}
                value={field.value ?? ""}
                inputProps={{
                  maxLength: 50,
                }}
                required
                error={!!fieldState.error}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <Controller
            name="tipo"
            control={categoriaForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="tipo"
                color="info"
                options={tiposTransacoes || []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue?.id);
                }}
                value={
                  tiposTransacoes?.find((c) => c.id === field.value) || null
                }
                disabled={Boolean(categoriaForm.getValues("id"))}
                noOptionsText="Nenhum resultado encontrado."
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color="info"
                    variant="standard"
                    label="Tipo"
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
