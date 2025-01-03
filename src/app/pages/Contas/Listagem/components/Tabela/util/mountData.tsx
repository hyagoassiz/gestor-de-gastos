import { ListItemText, Tooltip } from "@mui/material";
import MoreOptions from "../../../../../../shared/components/MoreOptions/MoreOptions";
import { PowerIcon } from "../../../../../../shared/components/PowerIcon";
import { IResponseConta } from "../../../../../../shared/services/contas/interfaces";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

interface IMountData {
  contas: IResponseConta[] | undefined;
  handleInativar: (conta: IResponseConta) => void;
  handleEditar: (conta: IResponseConta) => void;
  handleAtivar: (conta: IResponseConta) => void;
}

export function mountData({
  contas,
  handleInativar,
  handleEditar,
  handleAtivar,
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
      situacao: conta.ativo ? "Ativo" : "Inativo",
      options: (
        <>
          {conta.ativo ? (
            <MoreOptions
              options={[
                { label: "Editar", action: () => handleEditar(conta) },
                { label: "Inativar", action: () => handleInativar(conta) },
              ]}
            />
          ) : (
            <PowerIcon onClick={() => handleAtivar(conta)} />
          )}
        </>
      ),
    }));
  }
  return [];
}
