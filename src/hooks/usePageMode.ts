import { PageMode } from "@/types";
import { useLocation, useParams } from "react-router-dom";

interface UsePageModeReturn {
  mode: PageMode;
}

export function usePageMode(): UsePageModeReturn {
  const location = useLocation();

  const { id } = useParams<{ id: string }>();

  let mode: "create" | "edit" | "view" = "create";

  if (location.pathname.endsWith("/nova")) {
    mode = "create";
  } else if (location.pathname.endsWith("/editar")) {
    mode = "edit";
  } else if (id) {
    mode = "view";
  }

  return { mode };
}
