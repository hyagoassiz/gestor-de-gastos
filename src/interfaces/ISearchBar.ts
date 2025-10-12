import { ChangeEventHandler } from "react";

export interface ISeachBar {
  placeholder: string;
  value: string | number;
  open: boolean;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  handleOpen: () => void;
  handleClose: () => void;
}
