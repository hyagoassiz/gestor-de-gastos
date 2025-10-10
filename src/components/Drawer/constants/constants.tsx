import * as PATHS from "../../../routes/paths";
import { IRotas } from "../interfaces";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ClassIcon from "@mui/icons-material/Class";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

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
  // {
  //   categoria: "",
  //   rotas: [
  //     { name: "Sobre", route: PATHS.ABOUT.LIST, icon: <DescriptionIcon /> },
  //   ],
  // },
  // {
  //   categoria: "",
  //   rotas: [
  //     { name: "Configurações", route: PATHS.SETTINGS.LIST, icon: <Settings /> },
  //   ],
  // },
];
