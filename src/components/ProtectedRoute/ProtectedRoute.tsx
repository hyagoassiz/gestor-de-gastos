import { FullScreenLoader } from "../FullScreenLoader";
import { useProtectedRoute } from "./hooks/useProtectedRoute";

interface ProtectedRouteProps {
  children: React.ReactNode;
  permission: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  permission,
}) => {
  const { signed } = useProtectedRoute({ permission });

  return signed ? <>{children}</> : <FullScreenLoader />;
};
