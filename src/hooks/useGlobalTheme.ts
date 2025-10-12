import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "./useLocalStorage";
import { IRootState } from "@/redux/store";
import { setDarkMode } from "@/redux/globalThemeSlice";

interface IUseGlobalThemeReturn {
  darkMode: boolean;
  toggleDarkMode(value: boolean): void;
}

export const useGlobalTheme = (): IUseGlobalThemeReturn => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state: IRootState) => state.theme.darkMode);

  const { obterDarkMode, salvarDarkMode } = useLocalStorage();

  useEffect(() => {
    const isDarkMode = obterDarkMode();
    dispatch(setDarkMode(isDarkMode));
  }, [darkMode]);

  const toggleDarkMode = useCallback((value: boolean) => {
    salvarDarkMode(value);
    dispatch(setDarkMode(value));
  }, []);

  return { darkMode, toggleDarkMode };
};
