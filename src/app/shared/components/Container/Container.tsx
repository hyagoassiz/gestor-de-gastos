import { ReactNode } from "react";
import { ContainerProps } from "@mui/material";
import { StyledContainer } from "./styles";

interface IContainer extends ContainerProps {
  children: ReactNode;
}

export const Container: React.FC<IContainer> = ({ children, sx, ...rest }) => {
  return (
    <StyledContainer sx={sx} disableGutters maxWidth={false} {...rest}>
      {children}
    </StyledContainer>
  );
};
