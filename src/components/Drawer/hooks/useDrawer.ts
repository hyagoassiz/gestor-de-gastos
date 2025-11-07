import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import { DrawerProps } from "@/types";

interface IUseDrawer {
  drawer: DrawerProps;
}

const useDrawer = (): IUseDrawer => {
  const drawer = useSelector((state: IRootState) => state.drawer);

  return { drawer };
};

export default useDrawer;
