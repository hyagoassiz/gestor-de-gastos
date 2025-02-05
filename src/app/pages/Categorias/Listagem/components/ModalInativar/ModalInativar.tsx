import { Button, Typography } from "@mui/material";
import { Modal } from "../../../../../shared/components/Modal/Modal";
import useModalInativar from "./hooks/useModalInativar";
import { useTranslation } from "react-i18next";

export const ModalInativar: React.FC = () => {
  const { openModalInativar, toggleModalInativar, handleInativar } =
    useModalInativar();

  const { t } = useTranslation();

  return (
    <Modal
      open={openModalInativar}
      title={`${t("INFO.DEACTIVATE")}?`}
      style={{ width: "300px" }}
      buttons={
        <>
          <Button variant="text" onClick={toggleModalInativar}>
            {t("BUTTONS.CLOSE")}
          </Button>
          <Button variant="contained" onClick={handleInativar}>
            {t("BUTTONS.DEACTIVATE")}
          </Button>
        </>
      }
    >
      <Typography align="justify">
        {t("PAGES.CATEGORIAS.MODALS.MODAL_DEACTIVATE.DESCRIPTION")}
      </Typography>
    </Modal>
  );
};
