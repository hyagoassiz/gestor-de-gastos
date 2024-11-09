import { useSelector } from "react-redux";
import { ILoading, IRootState } from "../../../interfaces";

interface IUseLoadingProgress {
  loading: ILoading;
}

export const useLoadingProgress = (): IUseLoadingProgress => {
  const loading = useSelector((state: IRootState) => state.loading);

  return { loading };
};
