import { CSSProperties, ReactNode } from "react";

export interface IDataColumns {
  key: string;
  label: string | ReactNode;
  style?: CSSProperties;
  align?: "left" | "center" | "right" | "justify" | "inherit";
}
