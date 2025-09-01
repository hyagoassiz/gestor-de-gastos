import { ChangeEvent, useRef } from "react";
import { getAtivos } from "../../../../api/Ativos/getAtivos";
import * as XLSX from "xlsx";
import dayjs from "dayjs";
import { useLoading } from "../../../../hooks/useLoading";
import { useNotification } from "../../../../hooks/useNotification";
import { postOperacaoEmLote } from "../../../../api/Operacoes/postOperacaoEmLote";
import { KEY_GET_OPERACOES } from "../../../../api/Operacoes/utils/getQueryOptionsGetOperacoes";
import { useQueryClient } from "@tanstack/react-query";

interface IExcelOperacoesRow {
  Data: string;
  Tipo: ITipoOperacaoApi["id"];
  Ativo: string;
  Quantidade: number;
  "Preço Unitário": number;
  Total: number;
  Observação?: string;
}

interface IUsePostOperacaoEmLote {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange(event: ChangeEvent<HTMLInputElement>): Promise<void>;
  handleImportClick(): void;
}

const usePostOperacaoEmLote = (): IUsePostOperacaoEmLote => {
  const { setLoading } = useLoading();

  const queryClient = useQueryClient();

  const { showSnackBar } = useNotification();

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    try {
      setLoading(true);

      const payload = await mountPayloadOperacaoEmLote(event);

      await postOperacaoEmLote(payload);

      showSnackBar("Importação concluída com sucesso!", "success");
      queryClient.invalidateQueries({ queryKey: [KEY_GET_OPERACOES] });
    } catch (err) {
      console.error("Erro ao importar o arquivo:", err);
      showSnackBar("Erro ao importar arquivo Excel", "error");
    } finally {
      setLoading(false);
    }
  }

  function handleImportClick(): void {
    fileInputRef.current?.click();
  }

  async function mountPayloadOperacaoEmLote(
    event: ChangeEvent<HTMLInputElement>
  ): Promise<IOperacaoEmLotePayloadApi[]> {
    const file = event.target.files?.[0];

    if (!file) return [];

    try {
      const ativos = await getAtivos();

      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows: IExcelOperacoesRow[] = XLSX.utils.sheet_to_json(sheet);

      const now = dayjs().toISOString();

      const payload: IOperacaoEmLotePayloadApi[] = [];

      for (const row of rows) {
        const ativoEncontrado = ativos.find(
          (ativo) => ativo.sigla.toUpperCase() === row["Ativo"].toUpperCase()
        );

        const [dia, mes, ano] = row["Data"].split("/");
        const dataFormatada = `${ano}-${mes}-${dia}`;

        payload.push({
          dataOperacao: dataFormatada,
          tipoOperacaoId: row["Tipo"].toUpperCase() as ITipoOperacaoApi["id"],
          ativoId: ativoEncontrado?.id ?? row["Ativo"],
          quantidade: Number(row["Quantidade"]),
          precoUnitario: Number(row["Preço Unitário"]),
          total: Number(row["Total"]),
          observacao: row["Observação"] ?? "",
          criadoEm: now,
          atualizadoEm: "",
        });
      }

      return payload;
    } catch (error) {
      console.error("Erro ao montar payload", error);
      return [];
    }
  }

  return { fileInputRef, handleFileChange, handleImportClick };
};

export default usePostOperacaoEmLote;
