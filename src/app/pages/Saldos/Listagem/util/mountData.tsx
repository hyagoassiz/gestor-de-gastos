import { Box, ListItemText, Typography } from "@mui/material";
import { ISaldo } from "../../../../shared/interfaces";
import { NumericFormat } from "react-number-format";
import { MoreOptions } from "../../../../shared/components/MoreOptions";

interface IMountData {
  saldos: ISaldo[] | undefined;
  handleTransferir(idConta: string): void;
}

export function mountData({ saldos, handleTransferir }: IMountData) {
  if (saldos?.length) {
    return saldos.map((saldo) => ({
      ...saldo,
      conta: (
        <ListItemText
          primary={saldo.nomeConta}
          primaryTypographyProps={{ fontSize: "14px" }}
          secondary={
            saldo.agencia && saldo.conta
              ? `Agência ${saldo.agencia} / Conta ${saldo.conta}`
              : ""
          }
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      ),
      entradas: (
        <ListItemText
          primary={
            <NumericFormat
              value={saldo.valores.concluido.entradas}
              prefix={"R$ "}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator=","
              thousandSeparator={"."}
              displayType="text"
            />
          }
          secondary={
            <Box>
              À receber:
              <NumericFormat
                value={saldo.valores.pendente.entradas}
                prefix={" R$ "}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator=","
                thousandSeparator={"."}
                displayType="text"
              />
            </Box>
          }
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      ),
      saidas: (
        <ListItemText
          primary={
            <NumericFormat
              value={saldo.valores.concluido.saidas}
              prefix={"R$ "}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator=","
              thousandSeparator={"."}
              displayType="text"
            />
          }
          secondary={
            <Box>
              À pagar:
              <NumericFormat
                value={saldo.valores.pendente.saidas}
                prefix={" R$ "}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator=","
                thousandSeparator={"."}
                displayType="text"
              />
            </Box>
          }
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      ),
      saldoAtual: (
        <ListItemText
          primary={
            <Typography
              sx={{
                color: saldo.valores.concluido.saldo > 0 ? "green" : "red",
              }}
            >
              <NumericFormat
                value={saldo.valores.concluido.saldo}
                prefix={"R$ "}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator=","
                thousandSeparator={"."}
                displayType="text"
              />
            </Typography>
          }
          secondary={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "12px", marginRight: "4px" }}>
                Previsto:
              </Typography>

              <NumericFormat
                value={
                  saldo.valores.concluido.saldo + saldo.valores.pendente.saldo
                }
                prefix={" R$ "}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator=","
                thousandSeparator={"."}
                displayType="text"
              />
            </Box>
          }
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      ),
      options: (
        <>
          <MoreOptions
            options={[
              {
                label: "Transferir Saldo",
                action: () => handleTransferir(saldo.idConta),
              },
            ]}
          />
        </>
      ),
    }));
  }
  return [];
}
