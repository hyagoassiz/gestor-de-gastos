import * as PATHS from "../../../routes/paths";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ClassIcon from "@mui/icons-material/Class";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import HomeIcon from "@mui/icons-material/Home";
import { IOptionsSideBar } from "./interfaces";

export const ROTAS: IOptionsSideBar[] = [
  {
    title: "",
    routes: [
      { name: "Dashboard", route: PATHS.DASHBOARD.LIST, icon: <HomeIcon /> },
    ],
  },
  {
    title: "Movimentações",
    routes: [
      {
        name: "Transações",
        route: PATHS.TRANSACOES.LIST,
        icon: <SwapVertIcon />,
      },
      { name: "Saldos", route: PATHS.SALDOS.LIST, icon: <AttachMoneyIcon /> },
    ],
  },
  {
    title: "Sub Cadastros",
    routes: [
      { name: "Categorias", route: PATHS.CATEGORIAS.LIST, icon: <ClassIcon /> },
      {
        name: "Contas",
        route: PATHS.CONTAS.LIST,
        icon: <AccountBalanceIcon />,
      },
    ],
  },
];
