import { ListItemText, MenuItem } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { getAgenciaContaLabel } from "../../../../utils/getSecondaryText";
import { PaginatedResponse, Transacao } from "@/types";
import { EnumSituacao, EnumTipoMovimentacao } from "@/types/enums";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";

interface MountDataProps {
  transacoes: PaginatedResponse<Transacao> | undefined;
  handleEditarTransacao(id: number): void;
  handleExcluirTransacao(id: number): void;
  handleVisualizarTransacao(id: number): void;
}

export function mountData({
  transacoes,
  handleEditarTransacao,
  handleExcluirTransacao,
  handleVisualizarTransacao,
}: MountDataProps): any[] {
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
                {!transacao.geradaAutomaticamente && (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleEditarTransacao(transacao.id);
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
                  </>
                )}

                {transacao.geradaAutomaticamente && (
                  <>
                    <MenuItem
                      onClick={() => {
                        handleVisualizarTransacao(transacao.id);
                        handleClose();
                      }}
                    >
                      Visualizar
                    </MenuItem>
                  </>
                )}
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
