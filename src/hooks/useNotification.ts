import { useDispatch } from "react-redux";
import { showSnackBar as showSnackBarRedux } from "../redux/snackBarSlice";
import { SnackBar } from "@/types";

interface UseNotificationReturn {
  showSnackBar(message: string, type: SnackBar["type"]): void;
}

export const useNotification = (): UseNotificationReturn => {
  const dispatch = useDispatch();

  function showSnackBar(message: string, type: SnackBar["type"]): void {
    dispatch(showSnackBarRedux({ message, type }));
  }

  return { showSnackBar };
};
