import { Button, Typography } from "@mui/material";
import { Modal } from "../../../../../shared/components/Modal/Modal";
import useModalObservacao from "./hooks/useModalObservacao";

export const ModalObservacao: React.FC = () => {
  const { observacao, openModalObservacao, toggleModalObservacao } =
    useModalObservacao();

  return (
    <Modal
      open={openModalObservacao}
      title="Observação"
      style={{ width: "300px" }}
      buttons={
        <>
          <Button
            color="info"
            variant="contained"
            onClick={toggleModalObservacao}
          >
            Fechar
          </Button>
        </>
      }
    >
      <Typography color="textPrimary" align="justify">
        {observacao}
      </Typography>
    </Modal>
  );
};
