import { useDispatch, useSelector } from "react-redux";
import { IRootState, ISnackBar } from "../../../interfaces";
import { useEffect } from "react";
import { closeSnackbar } from "../../../redux/snackBar/actions";

interface IUseSnackbar {
  snackBar: ISnackBar;
  handleClose: () => void;
}

const useSnackBar = (): IUseSnackbar => {
  const dispatch = useDispatch();
  const snackBar = useSelector((state: IRootState) => state.snackBar);

  useEffect(() => {
    if (snackBar.open) {
      setTimeout(() => {
        handleClose();
      }, 3000);

      return () => handleClose();
    }
  });

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  return { handleClose, snackBar };
};

export default useSnackBar;
