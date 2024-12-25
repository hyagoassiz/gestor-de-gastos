import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import useMoreOptions from "./hooks/useMoreOptions";
import { useTranslation } from "react-i18next";

interface IMoreOptions {
  options: {
    label: string;
    action: () => void;
  }[];
}

const MoreOptions = ({ options }: IMoreOptions) => {
  const { handleClick, anchorEl, handleClose } = useMoreOptions();

  const { t } = useTranslation();

  return (
    <>
      <Tooltip placement="top" title={t("TOOLTIPS.OPTIONS")}>
        <IconButton
          color="info"
          aria-controls="options-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVert />
        </IconButton>
      </Tooltip>
      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              option.action();
              handleClose();
            }}
            sx={{ fontSize: "14px" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MoreOptions;
