import { Button } from "@mui/material";
import { Frame } from "../../../components/Frame";
import { Header } from "../../../components/Header";
import { ToolbarContainer } from "../../../components/ToolbarContainer";
import { Add, UploadFile } from "@mui/icons-material";
import { useListagem } from "./hooks/useListagem";
import { DataTable } from "../../../components/DataTable/DataTable";
import { proventosColumns } from "./constants/constants";
import { mountData } from "./utils/mountData";
import { OperacaoModal } from "./components/OperacaoModal";
import { useLoading } from "../../../hooks/useLoading";
import { useNotification } from "../../../hooks/useNotification";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useRef } from "react";
import { getAtivos } from "../../../api/Ativos/getAtivos";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { postOperacao } from "../../../api/Operacoes/postOperacao";
import { KEY_GET_OPERACOES } from "../../../api/Operacoes/utils/getQueryOptionsGetOperacoes";

export const Listagem: React.FC = () => {
  const {
    operacoes,
    operacaoModalState,
    closeOperacaoModal,
    handleEditarOperacao,
    openOperacaoModal,
  } = useListagem();

  interface ExcelOperacoesRow {
    Data: string;
    Tipo: ITipoOperacaoApi["id"];
    Ativo: string;
    Quantidade: number;
    "Preço Unitário": number;
    Total: number;
    Observação?: string;
  }

  const { setLoading } = useLoading();

  const { showSnackBar } = useNotification();

  const queryClient = useQueryClient();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      const ativos = await getAtivos();

      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows: ExcelOperacoesRow[] = XLSX.utils.sheet_to_json(sheet);

      const now = dayjs().toISOString();

      for (const row of rows) {
        try {
          const ativoEncontrado = ativos.find(
            (ativo) => ativo.sigla.toUpperCase() === row["Ativo"].toUpperCase()
          );

          // Converte "DD/MM/YYYY" em "YYYY-MM-DD"
          const [dia, mes, ano] = row["Data"].split("/");
          const dataFormatada = `${ano}-${mes}-${dia}`;

          const payload: IOperacaoPayloadApi = {
            dataOperacao: dataFormatada,
            tipoOperacaoId: row["Tipo"],
            ativoId: ativoEncontrado?.id ?? row["Ativo"],
            quantidade: Number(row["Quantidade"]),
            precoUnitario: Number(row["Preço Unitário"]),
            total: Number(row["Total"]),
            observacao: row["Observação"] ?? "",
            createdAt: now,
            updatedAt: "",
          };

          await postOperacao(payload);
        } catch (err) {
          console.error("Erro ao importar linha:", err);
        }
      }

      showSnackBar("Importação concluída com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: [KEY_GET_OPERACOES] });
    } catch (err) {
      console.error("Erro ao importar o arquivo:", err);
      showSnackBar("Erro ao importar arquivo Excel", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Operações" />

      <Frame>
        <ToolbarContainer
          title={`Operações`}
          showTitleDivider
          showDividers
          buttons={
            <>
              <Button
                startIcon={<Add />}
                color="primary"
                variant="outlined"
                onClick={openOperacaoModal}
              >
                Nova
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
            </>
          }
        />

        <DataTable
          columns={proventosColumns}
          data={mountData({
            operacoes,
            handleEditarOperacao,
          })}
          textForEmptyData="Nenhum provento encontrado."
        />
      </Frame>

      {operacaoModalState.open && (
        <OperacaoModal
          operacao={operacaoModalState.operacao}
          open={operacaoModalState.open}
          onClose={closeOperacaoModal}
        />
      )}
    </>
  );
};
