export function getAgenciaContaLabel(agencia: string, conta: string): string {
  if (agencia !== "" && conta !== "") {
    const text = `Agência: ${agencia} / Conta: ${conta}`;

    return text;
  }

  return "-";
}
