export interface SaldoConta {
  contaId: number;
  nome: string;
  agencia: string;
  conta: string;
  saldo: number;
}

export interface SaldoContaParams {
  ativo?: boolean;
}

export interface TransferirSaldoPayload {
  contaOrigemId: number;
  contaDestinoId: number;
  valor: number;
}
