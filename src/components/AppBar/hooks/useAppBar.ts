import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store";
import { DrawerProps } from "@/types";

interface IUseAppBar {
  drawer: DrawerProps;
}

const useAppBar = (): IUseAppBar => {
  const drawer = useSelector((state: IRootState) => state.drawer);

  return { drawer };
};

export default useAppBar;
