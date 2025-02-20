import { useState } from "react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IRootState } from "../../../interfaces";
import { User } from "firebase/auth";

interface IUseAppBar {
  user: User;
  anchorElUser: null | HTMLElement;
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseUserMenu: () => void;
  navigate: NavigateFunction;
}

export const useAppBar = (): IUseAppBar => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const user = useSelector((state: IRootState) => state.user);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return {
    user,
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    navigate,
  };
};
