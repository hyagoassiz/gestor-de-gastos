import { ReactElement } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import * as PATHS from "../../../routes/paths";

export interface IOptions {
  icon: ReactElement;
  name: string;
  route: string;
  action?: (helpers: { navigate: (path: string) => void }) => Promise<void>;
}

export const options: IOptions[] = [
  {
    icon: <LogoutIcon />,
    name: "Sair",
    route: "#",
    action: async ({ navigate }) => {
      navigate(PATHS.AUTH.LOGIN);
    },
  },
];
