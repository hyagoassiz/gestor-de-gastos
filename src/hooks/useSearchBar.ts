import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useUrlParams } from "./useUrlParams";
import { SearchBar } from "@/types";

interface UseSearchBarProps {
  placeHolder?: string;
  debounceTime?: number;
}

interface UseSearchBarReturn {
  searchBar: SearchBar;
  textoBusca: string | undefined;
}

const useSearchBar = ({
  placeHolder = "Pesquisar...",
  debounceTime = 500,
}: UseSearchBarProps): UseSearchBarReturn => {
  const { setParams, getParam } = useUrlParams();

  const [value, setValue] = useState<string>("");
  const [textoBusca, setTextoBusca] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const textoBusca = getParam("textoBusca") ?? "";
    if (textoBusca) {
      setValue(String(textoBusca));
      handleOpen();
    }
  }, []);

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setTextoBusca(newValue);

      setParams({ textoBusca: newValue, pagina: 1 });
    }, debounceTime);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setValue("");
    setTextoBusca(undefined);

    setParams({ textoBusca: undefined });
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
