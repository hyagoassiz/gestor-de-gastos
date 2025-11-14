export function normalizarEspacos(valor: string): string {
  return valor.replace(/\s+/g, " ").trim();
}
