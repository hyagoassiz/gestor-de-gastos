import { Button, Grid, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import usePerfil from "./hooks/usePerfil";
import { ActionButtonsRow } from "@/components/ActionsButtonsRow";

export const Perfil: React.FC = () => {
  const perfil = usePerfil();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Controller
            name="nome"
            rules={{ required: true }}
            control={perfil.perfilForm.control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                size="small"
                label="Nome"
                fullWidth
                value={field.value ?? ""}
                required
                inputProps={{ maxLength: 100 }}
                disabled
                error={!!formState.errors.nome}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="email"
            rules={{ required: true }}
            control={perfil.perfilForm.control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                size="small"
                label="Email"
                fullWidth
                value={field.value ?? ""}
                required
                inputProps={{ maxLength: 100 }}
                disabled
                error={!!formState.errors.email}
              />
            )}
          />
        </Grid>
      </Grid>

      <ActionButtonsRow
        right={
          <Button variant="contained" disabled>
            Salvar Alterações
          </Button>
        }
      />
    </>
  );
};
