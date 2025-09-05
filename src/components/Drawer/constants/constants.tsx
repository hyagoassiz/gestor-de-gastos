import * as PATHS from "../../../routes/paths";
import { IRotas } from "../interfaces";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import { Settings } from "@mui/icons-material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

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
        name: "Operações",
        route: PATHS.OPERACOES.LIST,
        icon: <SwapVertIcon />,
      },
      // {
      //   name: "Proventos",
      //   route: PATHS.PROVENTOS.LIST,
      //   icon: <AttachMoneyIcon />,
      // },
      // {
      //   name: "Resumo",
      //   route: PATHS.RESUMO_ATIVO.LIST,
      //   icon: <AttachMoneyIcon />,
      // },
    ],
  },
  {
    categoria: "Sub Cadastros",
    rotas: [
      // {
      //   name: "Ativos",
      //   route: PATHS.ATIVOS.LIST,
      //   icon: <SpaceDashboardIcon />,
      // },
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
