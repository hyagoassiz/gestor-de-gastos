import { ChangeEventHandler } from "react";

export interface SearchBar {
  placeholder: string;
  value: string | number;
  open: boolean;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  handleOpen: () => void;
  handleClose: () => void;
}
