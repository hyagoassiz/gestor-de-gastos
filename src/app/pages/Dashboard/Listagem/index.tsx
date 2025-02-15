import { DashboardProvider } from "./context";
import { Listagem } from "./Listagem";

export function DashboardListagemRoute(): JSX.Element {
  return (
    <DashboardProvider>
      <Listagem />
    </DashboardProvider>
  );
}
