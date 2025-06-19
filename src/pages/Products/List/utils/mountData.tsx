import { MenuItem, Typography } from "@mui/material";
import { MoreOptions } from "../../../../components/MoreOptions";
import { NumericFormat } from "react-number-format";
import { PowerIcon } from "../../../../components/PowerIcon";

interface IMountData {
  products: IProductResponseApi[] | undefined;
  handleActivateProduct(product: IProductResponseApi): void;
  handleDeactivateProduct(product: IProductResponseApi): void;
  handleEditProduct(product: IProductResponseApi): void;
}

export function mountData({
  products,
  handleActivateProduct,
  handleDeactivateProduct,
  handleEditProduct,
}: IMountData): any[] {
  if (products?.length) {
    return products.map((product) => ({
      ...product,
      valor: (
        <Typography variant="body2">
          <NumericFormat
            value={product.valor}
            prefix={"R$ "}
            decimalScale={2}
            fixedDecimalScale={true}
            decimalSeparator=","
            thousandSeparator={"."}
            displayType="text"
          />
        </Typography>
      ),
      quantidade: (
        <Typography variant="body2">
          <NumericFormat
            value={product.quantidade}
            decimalScale={0}
            fixedDecimalScale={true}
            displayType="text"
          />
        </Typography>
      ),
      options: (
        <>
          {product.ativo ? (
            <MoreOptions>
              <MenuItem
                onClick={() => {
                  handleEditProduct(product);
                }}
              >
                Editar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDeactivateProduct(product);
                }}
              >
                Inativar
              </MenuItem>
            </MoreOptions>
          ) : (
            <PowerIcon onClick={() => handleActivateProduct(product)} />
          )}
        </>
      ),
    }));
  }
  return [];
}
