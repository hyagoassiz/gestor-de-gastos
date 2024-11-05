import { CSSProperties, ReactNode } from "react";

export interface ITableColumn {
  key: string;
  label: string | ReactNode;
  style?: CSSProperties;
  align?: "left" | "center" | "right" | "justify" | "inherit";
}
