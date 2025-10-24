import { ListItemText, MenuItem } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { getAgenciaContaLabel } from "../../../../utils/getSecondaryText";
import { Transacao } from "@/types";
import { EnumSituacao, EnumTipoMovimentacao } from "@/types/enums";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";

interface IMountDataProps {
  transacoes: IPaginatedResponse<Transacao> | undefined;
  handleEditarTransacao(transacaoId: string): void;
  handleExcluirTransacao(idTransacao: number): Promise<void>;
}

export function mountData({
  transacoes,
  handleEditarTransacao,
  handleExcluirTransacao,
}: IMountDataProps): any[] {
  if (transacoes?.content.length) {
    return transacoes.content.map((transacao) => ({
      ...transacao,
      tipoMovimentacao: EnumTipoMovimentacao[transacao.tipoMovimentacao],
      data: dayjs(transacao.data).format("DD/MM/YYYY"),
      valor: (
        <NumericFormat
          value={transacao.valor}
          displayType="text"
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
        />
      ),
      conta:
        transacao.conta.agencia && transacao.conta.agencia ? (
          <ListItemText
            primary={transacao.conta.nome}
            primaryTypographyProps={{ fontSize: "14px" }}
            secondaryTypographyProps={{ fontSize: "12px" }}
            secondary={getAgenciaContaLabel(
              transacao.conta.agencia,
              transacao.conta.conta
            )}
            sx={{ my: 0, height: "auto" }}
          />
        ) : (
          transacao.conta.nome
        ),
      categoria: transacao.categoria.nome,
      situacao: EnumSituacao[transacao.situacao],
      options: (
        <div>
          <MoreOptions>
            {({ handleClose }) => (
              <div>
                <MenuItem
                  onClick={() => {
                    handleEditarTransacao(String(transacao.id));
                    handleClose();
                  }}
                >
                  Editar
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleExcluirTransacao(transacao.id);
                    handleClose();
                  }}
                >
                  Excluir
                </MenuItem>
              </div>
            )}
          </MoreOptions>
        </div>
      ),
      style: { height: "48px" },
    }));
  }
  return [];
}
