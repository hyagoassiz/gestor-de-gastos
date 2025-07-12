import { Button, Stack } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Header } from "../../../components/Header";
import { ToolbarContainer } from "../../../components/ToolbarContainer";
import { Add, UploadFile } from "@mui/icons-material";
import { useList } from "./hooks/useList";
import { DataTable } from "../../../components/DataTable/DataTable";
import { incomeColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { IncomeModal } from "./components/IncomeModal";
import { ChangeEvent, useRef } from "react";
import { KEY_GET_INCOME } from "../../../api/Income/utils/getQueryOptionsGetIncome";
import { useLoading } from "../../../hooks/useLoading";
import { useNotification } from "../../../hooks/useNotification";
import { useQueryClient } from "@tanstack/react-query";
import { postIncome } from "../../../api/Income/postIncome";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { getAtivos } from "../../../api/Ativos/getAtivos";

export const List: React.FC = () => {
  const {
    income,
    incomeModalState,
    closeIncomeModal,
    handleDuplicarProvento,
    handleEditIncome,
    openIncomeModal,
  } = useList();

  console.log("teste", incomeModalState);

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  interface ExcelIncomeRow {
    "Data Pagamento": string;
    "Tipo Provento": IIncomeTypeApi["id"];
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

      const rows: ExcelIncomeRow[] = XLSX.utils.sheet_to_json(sheet);

      const now = dayjs().toISOString();

      for (const row of rows) {
        try {
          const ativoEncontrado = ativos.find(
            (ativo) => ativo.sigla.toUpperCase() === row["Ativo"].toUpperCase()
          );

          // Converte "DD/MM/YYYY" em "YYYY-MM-DD"
          const [dia, mes, ano] = row["Data Pagamento"].split("/");
          const dataFormatada = `${ano}-${mes}-${dia}`;

          const payload: IIncomePayloadApi = {
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

          await postIncome(payload);
        } catch (err) {
          console.error("Erro ao importar linha:", err);
        }
      }

      showSnackBar("Importação concluída com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: [KEY_GET_INCOME] });
    } catch (err) {
      console.error("Erro ao importar o arquivo:", err);
      showSnackBar("Erro ao importar arquivo Excel", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Proventos" />

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
                onClick={openIncomeModal}
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
              >
                Importar Excel
              </Button>
            </Stack>
          }
        />

        <DataTable
          columns={incomeColumns}
          data={mountData({
            income,
            handleEditIncome,
            handleDuplicarProvento,
          })}
          textForEmptyData="Nenhum provento encontrado."
        />
      </Frame>

      {incomeModalState.open && (
        <IncomeModal
          income={incomeModalState.income}
          open={incomeModalState.open}
          isDuplicating={incomeModalState.isDuplicating}
          onClose={closeIncomeModal}
        />
      )}
    </>
  );
};
