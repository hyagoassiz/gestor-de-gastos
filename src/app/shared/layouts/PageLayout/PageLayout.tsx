import { AppBar } from "../../components/AppBar/AppBar";
import { LoadingProgress } from "../../components/LoadingProgress";
import { BoxContainer, StyledBox } from "./styles";

interface IPageLayout {
  children: React.ReactNode;
}

export const PageLayout: React.FC<IPageLayout> = ({ children }) => {
  return (
    <BoxContainer>
      <AppBar />
      <StyledBox>
        <LoadingProgress />
        {children}
      </StyledBox>
    </BoxContainer>
  );
};
