import { ListItemText, Tooltip } from "@mui/material";
import { PowerIcon } from "../../../../../../shared/components/PowerIcon";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { IConta } from "../../../../../../shared/interfaces";
import { MoreOptions } from "../../../../../../shared/components/MoreOptions";

interface IMountData {
  contas: IConta[] | undefined;
  handleInativar: (conta: IConta) => void;
  handleEditar: (conta: IConta) => void;
  handleAtivar: (conta: IConta) => void;
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
