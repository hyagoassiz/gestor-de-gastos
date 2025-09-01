import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { BoxContainer, BoxMain, TitleStyled } from "./styles";
import gestorImage from "../../assets/images/gestor-ilustration2.png";

interface IAuthLayout {
  children: ReactNode;
  titleRoute: string;
  onKeyDown?(event: React.KeyboardEvent<HTMLDivElement>): void;
}

export const AuthLayout: React.FC<IAuthLayout> = ({
  children,
  titleRoute,
  onKeyDown,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Grid
          item
          md={6}
          sx={{
            backgroundImage: `url(${gestorImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor={theme.palette.primary.dark}
      >
        <BoxMain onKeyDown={onKeyDown}>
          <BoxContainer>
            <TitleStyled component="h1" variant="h5">
              {titleRoute}
            </TitleStyled>

            <Grid container spacing={2} sx={{ marginTop: "16px" }}>
              {children}
            </Grid>
          </BoxContainer>
        </BoxMain>
      </Grid>
    </Grid>
  );
};
