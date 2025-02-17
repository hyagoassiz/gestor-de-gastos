import { ISaldo } from "./ISaldo";

export type ISaldoMesAno = Pick<ISaldo, "valores" | "incluirEmSomas"> & {
  mesAno: string;
};
