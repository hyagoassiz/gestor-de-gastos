import { Button } from "@mui/material";
import { Modal } from "../../../../../shared/components/Modal/Modal";
import useModalCategoria from "./hooks/useModalCategoria";
import { useTranslation } from "react-i18next";

export const ModalCategoria: React.FC = () => {
  const { toggleModalCategoria, handleToggleModalCategoria } =
    useModalCategoria();

  const { t } = useTranslation();

  return (
    <Modal
      open={toggleModalCategoria}
      title={t("categorias.modalCategoria.add")}
      style={{ width: "500px" }}
      buttons={
        <>
          <Button variant="text" onClick={handleToggleModalCategoria}>
            {t("buttons.close")}
          </Button>
          <Button variant="contained" onClick={handleToggleModalCategoria}>
            {t("buttons.save")}
          </Button>
        </>
      }
    >
      Teste
    </Modal>
  );
};
