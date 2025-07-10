interface IUseCalcularValores {
  calcularTotal(quantidade: number, valorUnitario: number): number;
  calcularPrecoUnitario(total: number, quantidade: number): number;
}

const useCalcularValores = (): IUseCalcularValores => {
  function isNumeroValido(valor: unknown): valor is number {
    return typeof valor === "number" && Number.isFinite(valor);
  }

  function calcularTotal(quantidade: number, valorUnitario: number): number {
    if (!isNumeroValido(quantidade) || !isNumeroValido(valorUnitario)) return 0;

    return quantidade * valorUnitario;
  }

  function calcularPrecoUnitario(total: number, quantidade: number): number {
    if (
      !isNumeroValido(total) ||
      !isNumeroValido(quantidade) ||
      quantidade === 0
    )
      return 0;

    return total / quantidade;
  }

  return { calcularTotal, calcularPrecoUnitario };
};

export default useCalcularValores;
