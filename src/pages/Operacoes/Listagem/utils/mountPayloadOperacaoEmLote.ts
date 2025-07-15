import { ChangeEvent } from "react";
import { getAtivos } from "../../../../api/Ativos/getAtivos";
import * as XLSX from "xlsx";
import dayjs from "dayjs";

interface IExcelOperacoesRow {
  Data: string;
  Tipo: ITipoOperacaoApi["id"];
  Ativo: string;
  Quantidade: number;
  "Preço Unitário": number;
  Total: number;
  Observação?: string;
}

export async function mountPayloadOperacaoEmLote(
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
        tipoOperacaoId: row["Tipo"],
        ativoId: ativoEncontrado?.id ?? row["Ativo"],
        quantidade: Number(row["Quantidade"]),
        precoUnitario: Number(row["Preço Unitário"]),
        total: Number(row["Total"]),
        observacao: row["Observação"] ?? "",
        createdAt: now,
        updatedAt: "",
      });
    }

    return payload;
  } catch (error) {
    console.error("Erro ao montar payload", error);
    return [];
  }
}
