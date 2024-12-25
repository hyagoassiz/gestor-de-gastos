import FilterListIcon from "@mui/icons-material/FilterList";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IFilterIcon {
  onClick: () => void;
  badgeContent: number;
}
export const FilterIcon: React.FC<IFilterIcon> = ({
  onClick,
  badgeContent,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <IconButton onClick={onClick}>
        <Tooltip title={t("TOOLTIPS.FILTER")} placement="top">
          <Badge badgeContent={badgeContent} color="secondary">
            <FilterListIcon />
          </Badge>
        </Tooltip>
      </IconButton>
    </>
  );
};
