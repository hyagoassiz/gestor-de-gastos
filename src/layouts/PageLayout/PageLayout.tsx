import { AppBar } from "../../components/AppBar";
import { CircularProgress } from "../../components/CircularProgress";
import { Drawer } from "../../components/Drawer/Drawer";

interface IPageLayout {
  children: React.ReactNode;
}

export const PageLayout: React.FC<IPageLayout> = ({ children }) => {
  return (
    <>
      <AppBar />
      <Drawer>
        <CircularProgress />
        {children}
      </Drawer>
    </>
  );
};
