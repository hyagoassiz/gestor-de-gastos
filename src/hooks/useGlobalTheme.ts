import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { setDarkMode } from "@/redux/globalThemeSlice";
import { useLocalStorage } from "./useLocalStorage";

interface IUseGlobalThemeReturn {
  darkMode: boolean;
  toggleDarkMode(value: boolean): void;
}

export const useGlobalTheme = (): IUseGlobalThemeReturn => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state: IRootState) => state.theme.darkMode);

  const { obter, salvar } = useLocalStorage();

  useEffect(() => {
    const darkMode = obter("darkMode");
    const isDarkMode = darkMode === "true";
    dispatch(setDarkMode(isDarkMode));
  }, [darkMode]);

  const toggleDarkMode = useCallback((value: boolean) => {
    salvar("darkMode", value);
    dispatch(setDarkMode(value));
  }, []);

  return { darkMode, toggleDarkMode };
};
