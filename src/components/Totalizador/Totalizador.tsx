import { NumericFormat } from "react-number-format";
import { Card } from "../Card";

interface ITotalizadorProps {
  value: number;
  subTitle: string | number;
}

export const Totalizador: React.FC<ITotalizadorProps> = ({
  value,
  subTitle,
}) => {
  return (
    <Card
      title={
        <NumericFormat
          value={value}
          displayType="text"
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
        />
      }
      subTitle={subTitle}
    />
  );
};
