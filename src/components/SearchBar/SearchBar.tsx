import { IconButton, TextField, InputAdornment, Tooltip } from "@mui/material";
import { Search, Close } from "@mui/icons-material";
import { SearchBar as ISearchBar } from "@/types";

interface SearchBarProps {
  searchBar: ISearchBar;
}

const SearchBar = ({ searchBar }: SearchBarProps) => {
  const { onChange, placeholder, value, open, handleOpen, handleClose } =
    searchBar;

  if (!open) {
    return (
      <Tooltip title="Pesquisar" arrow>
        <IconButton onClick={handleOpen}>
          <Search />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      autoFocus
      sx={{
        width: 250,
        transition: "width 0.3s ease",
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClose} edge="end" size="small">
              <Close />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
