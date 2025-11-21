import * as PATHS from "../../../routes/paths";
import { IRotas } from "../interfaces";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ClassIcon from "@mui/icons-material/Class";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";

export const rotas: IRotas[] = [
  {
    categoria: "",
    rotas: [
      {
        name: "Dashboard",
        route: PATHS.DASHBOARD.LIST,
        icon: <SpaceDashboardIcon />,
      },
    ],
  },
  {
    categoria: "Movimentações",
    rotas: [
      {
        name: "Transações",
        route: PATHS.TRANSACOES.LIST,
        icon: <SwapVertIcon />,
      },
      {
        name: "Saldos",
        route: PATHS.SALDOS.LIST,
        icon: <AttachMoneyIcon />,
      },
      {
        name: "Objetivos",
        route: PATHS.OBJETIVOS.LISTAGEM,
        icon: <FlagIcon />,
      },
    ],
  },
  {
    categoria: "Sub Cadastros",
    rotas: [
      {
        name: "Categorias",
        route: PATHS.CATEGORIAS.LISTAGEM,
        icon: <ClassIcon />,
      },
      {
        name: "Contas",
        route: PATHS.CONTAS.LISTAGEM,
        icon: <AccountBalanceIcon />,
      },
    ],
  },
  {
    categoria: "Minha Conta",
    rotas: [
      {
        name: "Configurações",
        route: PATHS.CONFIGURACOES.LISTAGEM,
        icon: <SettingsIcon />,
      },
    ],
  },
];
