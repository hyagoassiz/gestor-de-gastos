import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { Modal } from "../../../../../shared/components/Modal/Modal";
import useModalCategoria from "./hooks/useModalCategoria";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { tipoCategorias } from "../../../../../shared/constants/tipoCategorias";

export const ModalCategoria: React.FC = () => {
  const {
    toggleModalCategoria,
    handleToggleModalCategoria,
    categoriaForm,
    onSubmit,
    categoria,
  } = useModalCategoria();

  const { t } = useTranslation();

  return (
    <Modal
      open={toggleModalCategoria}
      title={
        !categoria?.id
          ? t("PAGES.CATEGORIAS.MODALS.MODAL_CREATE.ADD")
          : t("PAGES.CATEGORIAS.MODALS.MODAL_CREATE.EDIT")
      }
      style={{ width: "600px" }}
      buttons={
        <>
          <Button variant="text" onClick={handleToggleModalCategoria}>
            {t("BUTTONS.CLOSE")}
          </Button>
          <Button
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
                color="secondary"
                variant="standard"
                onChange={field.onChange}
                value={field.value ?? ""}
                inputProps={{
                  maxLength: 30,
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
            name="entrada"
            control={categoriaForm.control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Autocomplete
                disablePortal
                id="entrada"
                color="secondary"
                options={tipoCategorias || []}
                getOptionLabel={(option) => option.nome || ""}
                onChange={(_, newValue) => {
                  field.onChange(newValue?.id);
                }}
                value={
                  tipoCategorias?.find((c) => c.id === field.value) || null
                }
                disabled={Boolean(categoriaForm.getValues("id"))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    color="secondary"
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
