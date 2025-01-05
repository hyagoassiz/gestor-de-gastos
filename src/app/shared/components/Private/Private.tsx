import { ReactNode } from "react";
import usePrivate from "./hooks/usePrivate";

interface IPrivate {
  children: ReactNode;
}

export const Private: React.FC<IPrivate> = ({ children }) => {
  const { signed } = usePrivate();

  return signed ? <>{children}</> : null;
};
