import { InputAdornment, TextField, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEventHandler, ReactNode } from "react";
import { BoxContainer, StyledBox, StyledContainer } from "./styles";

interface ISeachBar {
  placeholder: string;
  value: string | number;
  onChange:
    | ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
}

interface MuiFrameProps {
  buttons?: ReactNode;
  searchBar?: ISeachBar;
}

export const ToolPainel: React.FC<MuiFrameProps> = ({ buttons, searchBar }) => {
  const theme = useTheme();

  return (
    <>
      <StyledContainer>
        <BoxContainer>
          <StyledBox>{buttons}</StyledBox>
          <Box />
          <Box sx={{ display: "flex" }}>
            <TextField
              fullWidth
              id="outlined-search"
              variant="outlined"
              color="primary"
              placeholder={searchBar?.placeholder}
              value={searchBar?.value}
              onChange={searchBar?.onChange}
              InputProps={{
                style: {
                  paddingLeft: theme.spacing(1),
                  paddingRight: theme.spacing(1),
                  height: theme.spacing(4),
                  width: "100%",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="info" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </BoxContainer>
      </StyledContainer>
    </>
  );
};
