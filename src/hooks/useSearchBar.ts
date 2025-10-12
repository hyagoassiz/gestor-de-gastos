import { ChangeEvent, useState, useRef } from "react";
import { ISeachBar } from "../interfaces/ISearchBar";

interface IUseSearchBarProps {
  placeHolder: string;
  debounceTime?: number;
}

interface IUseSearchBar {
  searchBar: ISeachBar;
  textoBusca: string;
}

const useSearchBar = ({
  placeHolder,
  debounceTime = 500,
}: IUseSearchBarProps): IUseSearchBar => {
  const [value, setValue] = useState<string>("");
  const [textoBusca, setTextoBusca] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setTextoBusca(newValue);
    }, debounceTime);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setValue("");
    setTextoBusca("");
  };

  return {
    searchBar: {
      placeholder: placeHolder,
      value,
      open,
      onChange,
      handleOpen,
      handleClose,
    },
    textoBusca,
  };
};

export default useSearchBar;
