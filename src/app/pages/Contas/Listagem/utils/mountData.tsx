import { IconButton, ListItemText, Tooltip } from "@mui/material";
import { PowerIcon } from "../../../../shared/components/PowerIcon";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { IConta } from "../../../../shared/interfaces";
import { MoreOptions } from "../../../../shared/components/MoreOptions";
import CommentIcon from "@mui/icons-material/Comment";

interface IMountData {
  contas: IConta[] | undefined;
  handleAtivarConta(conta: IConta): void;
  handleEditarConta(conta: IConta): void;
  handleInativarConta(conta: IConta): void;
  toggleModalObservacao(conta: IConta): void;
}

export function mountData({
  contas,
  handleAtivarConta,
  handleEditarConta,
  handleInativarConta,
  toggleModalObservacao,
}: IMountData) {
  if (contas?.length) {
    return contas.map((conta) => ({
      ...conta,
      nome: (
        <ListItemText
          primary={conta.nome}
          primaryTypographyProps={{ fontSize: "14px" }}
          secondary={
            conta.agencia && conta.conta
              ? `Agência ${conta.agencia} / Conta ${conta.conta}`
              : ""
          }
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      ),
      incluirSoma: (
        <Tooltip title={conta.incluirSoma ? "Sim" : "Não"} placement="top">
          <DoneOutlineIcon color={conta.incluirSoma ? "success" : "disabled"} />
        </Tooltip>
      ),
      observacao: (
        <Tooltip placement="top" title="Observação">
          <IconButton
            disabled={!conta.observacao?.trim()}
            color="info"
            aria-controls="options-menu"
            aria-haspopup="true"
            onClick={() => toggleModalObservacao(conta)}
          >
            <CommentIcon
              color={!conta.observacao?.trim() ? "disabled" : "info"}
            />
          </IconButton>
        </Tooltip>
      ),
      options: (
        <>
          {conta.ativo ? (
            <MoreOptions
              options={[
                { label: "Editar", action: () => handleEditarConta(conta) },
                { label: "Inativar", action: () => handleInativarConta(conta) },
              ]}
            />
          ) : (
            <PowerIcon onClick={() => handleAtivarConta(conta)} />
          )}
        </>
      ),
    }));
  }
  return [];
}
