import * as PATHS from "../../../routes/paths";
import { IRotas } from "../interfaces";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import { Settings } from "@mui/icons-material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

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
        route: PATHS.INCOME.LIST,
        icon: <SpaceDashboardIcon />,
      },
    ],
  },
  {
    categoria: "Sub Cadastros",
    rotas: [
      {
        name: "Ativos",
        route: PATHS.ASSETS.LIST,
        icon: <SpaceDashboardIcon />,
      },
    ],
  },
  {
    categoria: "",
    rotas: [
      {
        name: "Vendas",
        route: PATHS.SALES.LIST,
        icon: <PointOfSaleIcon />,
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
