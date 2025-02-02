import { TransacoesProvider } from "./context";
import { Listagem } from "./Listagem";

export function TransacoesListagemRoute(): JSX.Element {
  return (
    <TransacoesProvider>
      <Listagem />
    </TransacoesProvider>
  );
}
