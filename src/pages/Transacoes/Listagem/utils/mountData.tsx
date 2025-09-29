import { ListItemText, MenuItem } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { getAgenciaContaLabel } from "../../../../utils/getSecondaryText";
import { Transacao } from "@/types";
import { EnumTipoMovimentacao } from "@/types/enums";

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
      pago: transacao.pago ? "Sim" : "Não",
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
