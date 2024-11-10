import { IconButton, Tooltip } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useTranslation } from "react-i18next";

interface IPowerIcon {
  onClick: () => void;
}
export const PowerIcon: React.FC<IPowerIcon> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <IconButton onClick={onClick}>
      <Tooltip title={t("tooltips.activate")} placement="top">
        <PowerSettingsNewIcon color="inherit" />
      </Tooltip>
    </IconButton>
  );
};
