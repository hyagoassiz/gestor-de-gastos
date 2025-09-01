import * as PATHS from "../../../routes/paths";
import { IRotas } from "../interfaces";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import { Settings } from "@mui/icons-material";
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
        name: "Operações",
        route: PATHS.OPERACOES.LIST,
        icon: <SpaceDashboardIcon />,
      },
      {
        name: "Proventos",
        route: PATHS.PROVENTOS.LIST,
        icon: <AttachMoneyIcon />,
      },
    ],
  },
  {
    categoria: "Sub Cadastros",
    rotas: [
      {
        name: "Ativos",
        route: PATHS.ATIVOS.LIST,
        icon: <SpaceDashboardIcon />,
      },
    ],
  },
  {
    categoria: "",
    rotas: [
      { name: "Sobre", route: PATHS.ABOUT.LIST, icon: <DescriptionIcon /> },
    ],
  },
  {
    categoria: "",
    rotas: [
      { name: "Configurações", route: PATHS.SETTINGS.LIST, icon: <Settings /> },
    ],
  },
];
