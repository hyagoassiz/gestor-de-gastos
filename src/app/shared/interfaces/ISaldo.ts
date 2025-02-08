export interface ISaldo {
  idConta: string;
  nomeConta: string;
  agencia: string;
  conta: string;
  valores: {
    concluido: {
      entradas: number;
      saidas: number;
      saldo: number;
    };
    pendente: {
      entradas: number;
      saidas: number;
      saldo: number;
    };
  };
}
