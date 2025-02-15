import { useSelector } from "react-redux";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IRootState } from "../../../interfaces";
import { User } from "firebase/auth";

interface IUseSideBar {
  user: User;
  opcaoSelecionada: string | null;
  setOpcaoSelecionada: Dispatch<SetStateAction<string>>;
}

export const useSideBar = (): IUseSideBar => {
  const user = useSelector((state: IRootState) => state.user);

  const location = useLocation();

  const [opcaoSelecionada, setOpcaoSelecionada] =
    useState<string>("Transações");

  useEffect(() => {
    setOpcaoSelecionada(location.pathname);
  }, [location]);

  return { user, opcaoSelecionada, setOpcaoSelecionada };
};
