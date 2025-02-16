import { IconButton, ListItemText, Tooltip, Typography } from "@mui/material";
import { ITransacao } from "../../../../shared/interfaces";
import { TipoMovimentacao } from "../../../../shared/components/TipoMovimentacao";
import { NumericFormat } from "react-number-format";
import { MoreOptions } from "../../../../shared/components/MoreOptions";
import dayjs from "dayjs";
import CommentIcon from "@mui/icons-material/Comment";

interface IMountData {
  transacoes: ITransacao[] | undefined;
  handleEditarTransacao(transacao: ITransacao): void;
  handleExcluirTransacao(transacao: ITransacao): void;
  toggleModalObservacao(transacao: ITransacao): void;
}

export function mountData({
  transacoes,
  handleEditarTransacao,
  handleExcluirTransacao,
  toggleModalObservacao,
}: IMountData) {
  if (transacoes?.length) {
    return transacoes.map((transacao) => ({
      ...transacao,
      data: dayjs(transacao.data, "DD-MM-YYYY").format("DD/MM/YYYY"),
      tipo: <TipoMovimentacao tipo={transacao.tipo} />,
      categoria: transacao.nomeCategoria,
      conta: (
        <ListItemText
          primary={transacao.nomeConta}
          primaryTypographyProps={{ fontSize: "14px" }}
          secondary={
            transacao.agencia && transacao.conta
              ? `Agência ${transacao.agencia} / Conta ${transacao.conta}`
              : ""
          }
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      ),
      valor: (
        <Typography variant="body2">
          <NumericFormat
            value={transacao.valor}
            prefix={"R$ "}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator=","
            thousandSeparator={"."}
            displayType="text"
          />
        </Typography>
      ),
      situacao:
        transacao.tipo === "ENTRADA" && transacao.concluido
          ? "Recebido"
          : transacao.tipo === "ENTRADA"
          ? "Pendente"
          : transacao.tipo === "SAIDA" && transacao.concluido
          ? "Pago"
          : "Em aberto",

      observacao: (
        <Tooltip placement="top" title="Observação">
          <IconButton
            disabled={!transacao.observacao?.trim()}
            color="info"
            aria-controls="options-menu"
            aria-haspopup="true"
            onClick={() => toggleModalObservacao(transacao)}
          >
            <CommentIcon
              color={!transacao.observacao?.trim() ? "disabled" : "info"}
            />
          </IconButton>
        </Tooltip>
      ),

      options: (
        <MoreOptions
          options={[
            { label: "Editar", action: () => handleEditarTransacao(transacao) },
            {
              label: "Excluir",
              action: () => handleExcluirTransacao(transacao),
            },
          ]}
        />
      ),
    }));
  }
  return [];
}
