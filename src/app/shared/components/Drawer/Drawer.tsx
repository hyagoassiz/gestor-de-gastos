import {
  Button,
  IconButton,
  Drawer as MuiDrawer,
  Tooltip,
} from "@mui/material";
import { ReactNode } from "react";
import {
  Icon,
  BoxApply,
  BoxButtons,
  BoxChildren,
  HeaderBox,
  StyledBox,
  StyledTypography,
} from "./styles";
import { useTranslation } from "react-i18next";

interface IDrawer {
  open: boolean;
  children: ReactNode;
  closeFilter: () => void;
  applyFilter: () => void;
}

const Drawer = ({ open, children, closeFilter, applyFilter }: IDrawer) => {
  const { t } = useTranslation();

  return (
    <MuiDrawer open={open} anchor="right" onClose={closeFilter}>
      <StyledBox>
        <HeaderBox>
          <BoxButtons>
            <Tooltip title={t("tooltips.close")} placement="bottom">
              <IconButton onClick={closeFilter}>
                <Icon />
              </IconButton>
            </Tooltip>
            <StyledTypography variant="h6">
              {t("buttons.close")}
            </StyledTypography>
            <BoxApply>
              <Button
                color="secondary"
                variant="contained"
                onClick={applyFilter}
              >
                {t("buttons.apply")}
              </Button>
            </BoxApply>
          </BoxButtons>
        </HeaderBox>
        <BoxChildren>{children}</BoxChildren>
      </StyledBox>
    </MuiDrawer>
  );
};

export default Drawer;
