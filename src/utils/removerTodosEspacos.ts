export function removerTodosEspacos(valor: string): string {
  return valor.replace(/\s+/g, "");
}
