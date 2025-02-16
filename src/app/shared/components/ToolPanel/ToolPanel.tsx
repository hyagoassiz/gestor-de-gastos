import { InputAdornment, TextField, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ReactNode } from "react";
import { BoxContainer, StyledBox, StyledContainer } from "./styles";
import { ISeachBar } from "../../interfaces";

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
          {searchBar && (
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                id="outlined-search"
                variant="outlined"
                color="primary"
                placeholder={searchBar.placeholder}
                value={searchBar.value}
                onChange={searchBar.onChange}
                InputProps={{
                  style: {
                    paddingLeft: theme.spacing(1),
                    paddingRight: theme.spacing(1),
                    height: theme.spacing(5),
                    width: "100%",
                    backgroundColor: theme.palette.primary.main,
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="info" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}
        </BoxContainer>
      </StyledContainer>
    </>
  );
};
