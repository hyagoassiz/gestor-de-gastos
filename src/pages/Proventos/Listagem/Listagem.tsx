import {
  Autocomplete,
  Button,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Add, UploadFile } from "@mui/icons-material";
import { useList } from "./hooks/useList";
import { DataTable } from "../../../components/DataTable/DataTable";
import { proventosColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { ModalProvento } from "./components/ModalProvento";
import { ChangeEvent, useRef } from "react";
import { KEY_GET_PROVENTOS } from "../../../api/Proventos/utils/getQueryOptionsGetProventos";
import { useLoading } from "../../../hooks/useLoading";
import { useNotification } from "../../../hooks/useNotification";
import { useQueryClient } from "@tanstack/react-query";
import { postProvento } from "../../../api/Proventos/postProvento";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { getAtivos } from "../../../api/Ativos/getAtivos";
import ToolbarContainer from "../../../components/ToolbarContainer/ToolbarContainer";
import Header from "../../../components/Header/Header";
import { FilterDrawer } from "../../../components/FilterDrawer";
import { Controller } from "react-hook-form";

export const Listagem: React.FC = () => {
  const {
    ativos,
    proventos,
    modalProventoState,
    filterForm,
    filterCount,
    closeModalProvento,
    handleEditProventos,
    handleDuplicarProvento,
    handleSubmitFilterForm,
    openModalProvento,
  } = useList();

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  interface ExcelProventosRow {
    "Data Pagamento": string;
    "Tipo Provento": IProventoTypeApi["id"];
    Ativo: string;
    Quantidade: number;
    "Preço Unitário": number;
    Total: number;
    Observação?: string;
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      const ativos = await getAtivos();

      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows: ExcelProventosRow[] = XLSX.utils.sheet_to_json(sheet);

      const now = dayjs().toISOString();

      for (const row of rows) {
        try {
          const ativoEncontrado = ativos.find(
            (ativo) => ativo.sigla.toUpperCase() === row["Ativo"].toUpperCase()
          );

          // Converte "DD/MM/YYYY" em "YYYY-MM-DD"
          const [dia, mes, ano] = row["Data Pagamento"].split("/");
          const dataFormatada = `${ano}-${mes}-${dia}`;

          const payload: IProventoPayloadApi = {
            dataPagamento: dataFormatada,
            tipoProventoId: row["Tipo Provento"],
            ativoId: ativoEncontrado?.id ?? row["Ativo"],
            quantidade: Number(row["Quantidade"]),
            precoUnitario: Number(row["Preço Unitário"]),
            total: Number(row["Total"]),
            observacao: row["Observação"] ?? "",
            createdAt: now,
            updatedAt: "",
          };

          await postProvento(payload);
        } catch (err) {
          console.error("Erro ao importar linha:", err);
        }
      }

      showSnackBar("Importação concluída com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: [KEY_GET_PROVENTOS] });
    } catch (err) {
      console.error("Erro ao importar o arquivo:", err);
      showSnackBar("Erro ao importar arquivo Excel", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header
        title="Proventos"
        buttons={
          <FilterDrawer
            applyFilter={handleSubmitFilterForm}
            filterCount={filterCount}
          >
            <Controller
              name="ativos"
              control={filterForm.control}
              rules={{ required: false }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  multiple
                  disablePortal
                  id="ativo"
                  options={ativos ?? []}
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
                  value={field.value ?? []}
                  isOptionEqualToValue={(option, value) =>
                    option?.id === value.id
                  }
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
                      label="Ativos"
                      fullWidth
                      error={!!fieldState.error}
                    />
                  )}
                />
              )}
            />
          </FilterDrawer>
        }
      />

      <Frame>
        <ToolbarContainer
          title="Proventos"
          showTitleDivider
          showDividers
          buttons={
            <Stack direction="row" spacing={1}>
              <Button
                startIcon={<Add />}
                color="primary"
                variant="outlined"
                onClick={openModalProvento}
              >
                Novo
              </Button>

              <input
                type="file"
                accept=".xlsx, .xls"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              <Button
                startIcon={<UploadFile />}
                color="secondary"
                variant="outlined"
                onClick={handleImportClick}
                disabled
              >
                Importar Excel
              </Button>
            </Stack>
          }
        />

        <DataTable
          columns={proventosColumns}
          data={mountData({
            proventos,
            handleEditProventos,
            handleDuplicarProvento,
          })}
          textForEmptyData="Nenhum provento encontrado."
        />
      </Frame>

      {modalProventoState.open && (
        <ModalProvento
          provento={modalProventoState.provento}
          open={modalProventoState.open}
          isDuplicating={modalProventoState.isDuplicating}
          onClose={closeModalProvento}
        />
      )}
    </>
  );
};
