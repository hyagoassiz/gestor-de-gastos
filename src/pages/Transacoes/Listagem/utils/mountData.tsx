import { ListItemText, MenuItem } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { getAgenciaContaLabel } from "../../../../utils/getSecondaryText";
import { Transacao } from "@/types";
import { EnumTipoMovimentacao } from "@/types/enums";
import dayjs from "dayjs";
import { data } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { getSituacaoTransacao } from "./getSituacaoTransacao";

interface IMountDataProps {
  transacoes: IPaginatedResponse<Transacao> | undefined;
  handleEditarTransacao(transacao: Transacao): void;
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
      pago: getSituacaoTransacao(transacao.tipoMovimentacao, transacao.pago),
      options: (
        <div>
          <MoreOptions>
            {({ handleClose }) => (
              <div>
                <MenuItem
                  onClick={() => {
                    handleEditarTransacao(transacao);
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
