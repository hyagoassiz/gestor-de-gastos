import { Button, Typography } from "@mui/material";
import { Modal } from "../../../../../shared/components/Modal/Modal";
import useModalInativar from "./hooks/useModalInativar";
import { useTranslation } from "react-i18next";

export const ModalInativar: React.FC = () => {
  const { toggleModalInativar, handleToggleModalInativar } = useModalInativar();

  const { t } = useTranslation();

  return (
    <Modal
      open={toggleModalInativar}
      title={`${t("info.deactivate")}?`}
      style={{ width: "300px" }}
      buttons={
        <>
          <Button variant="text" onClick={handleToggleModalInativar}>
            {t("buttons.close")}
          </Button>
          <Button variant="contained" onClick={handleToggleModalInativar}>
            {t("buttons.deactivate")}
          </Button>
        </>
      }
    >
      <Typography align="justify">
        {t("categorias.modalInativar.description")}
      </Typography>
    </Modal>
  );
};
