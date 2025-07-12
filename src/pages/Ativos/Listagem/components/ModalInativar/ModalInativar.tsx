import { Button, Typography } from "@mui/material";
import { Modal } from "../../../../../components/Modal";
import { useModalInativar } from "./hooks/useModalInativar";

export interface IModalInativarProps {
  ativo: IAtivoResponseApi | null;
  open: boolean;
  onClose(): void;
}

export const ModalInativar: React.FC<IModalInativarProps> = ({
  ativo,
  open,
  onClose,
}) => {
  const { submit } = useModalInativar({
    ativo,
    onClose,
  });

  return (
    <Modal
      open={open}
      style={{ width: "300px", height: "auto", minWidth: 480 }}
      title="Deseja inativar este ativo?"
      buttons={
        <>
          <Button variant="text" onClick={onClose}>
            Fechar
          </Button>
          <Button variant="contained" onClick={submit}>
            Inativar
          </Button>
        </>
      }
    >
      <Typography color="textPrimary" align="justify">
        Inativando este produto, ele não poderá ser usado em novas
        movimentações. O histórico será mantido e você poderá reativá-lo
        filtrando pelos inativos.
      </Typography>
    </Modal>
  );
};
