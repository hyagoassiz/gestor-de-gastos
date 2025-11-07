import { useDispatch } from "react-redux";
import { setLoading as setLoadingRedux } from "../redux/loadingSlice";

interface UseLoadingReturn {
  setLoading(isLoading: boolean): void;
}

export const useLoading = (): UseLoadingReturn => {
  const dispatch = useDispatch();

  function setLoading(isLoading: boolean): void {
    dispatch(setLoadingRedux(isLoading));
  }

  return { setLoading };
};
