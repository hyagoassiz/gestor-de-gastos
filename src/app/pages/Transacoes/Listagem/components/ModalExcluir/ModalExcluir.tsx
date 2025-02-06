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
      title={`${t("INFO.DELETE")}?`}
      style={{ width: "300px" }}
      buttons={
        <>
          <Button variant="text" onClick={toggleModalExcluir}>
            {t("BUTTONS.CLOSE")}
          </Button>
          <Button variant="contained" onClick={handleExcluirTransacao}>
            {t("BUTTONS.DELETE")}
          </Button>
        </>
      }
    >
      <Typography align="justify">
        "Ao clicar em "Excluir", a transação será excluída e não poderá ser
        recuperada."
      </Typography>
    </Modal>
  );
};
