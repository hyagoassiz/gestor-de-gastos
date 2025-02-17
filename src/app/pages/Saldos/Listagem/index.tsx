import { SaldosProvider } from "./context";
import { Listagem } from "./Listagem";

export function SaldosListagemRoute(): JSX.Element {
  return (
    <SaldosProvider>
      <Listagem />
    </SaldosProvider>
  );
}
