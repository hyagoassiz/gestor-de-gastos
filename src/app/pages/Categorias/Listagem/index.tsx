import { CategoriasProvider } from "./context";
import { Listagem } from "./Listagem";

export function CategoriasListagemRoute(): JSX.Element {
  return (
    <CategoriasProvider>
      <Listagem />
    </CategoriasProvider>
  );
}
