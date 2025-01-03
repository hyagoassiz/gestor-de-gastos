import { ContasProvider } from "./context";
import { Listagem } from "./Listagem";

export function ContasListagemRoute(): JSX.Element {
  return (
    <ContasProvider>
      <Listagem />
    </ContasProvider>
  );
}
