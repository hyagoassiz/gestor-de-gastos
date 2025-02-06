import { Button, Typography } from "@mui/material";
import { Modal } from "../../../../../shared/components/Modal/Modal";
import useModalInativar from "./hooks/useModalExcluir";
import { useTranslation } from "react-i18next";

export const ModalExcluir: React.FC = () => {
  const { openModalExcluir, handleExcluirTransacao, toggleModalExcluir } =
    useModalInativar();

  const { t } = useTranslation();

  return (
    <Modal
      open={openModalExcluir}
      title={`${t("INFO.DEACTIVATE")}?`}
      style={{ width: "300px" }}
      buttons={
        <>
          <Button variant="text" onClick={toggleModalExcluir}>
            {t("BUTTONS.CLOSE")}
          </Button>
          <Button variant="contained" onClick={handleExcluirTransacao}>
            {t("BUTTONS.DEACTIVATE")}
          </Button>
        </>
      }
    >
      <Typography align="justify">
        {t("PAGES.CONTAS.MODALS.MODAL_DEACTIVATE.DESCRIPTION")}
      </Typography>
    </Modal>
  );
};
