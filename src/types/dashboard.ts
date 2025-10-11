export interface Totais {
  entradas: number;
  saidas: number;
  saldo: number;
  aReceber: number;
  aPagar: number;
}

export interface TransacaoMensal {
  totalEntradas: number;
  totalSaidas: number;
  saldo: number;
  mesAno: string;
}
export interface DespesaPorCategoria {
  categoriaId: number;
  categoria: string;
  total: number;
}
