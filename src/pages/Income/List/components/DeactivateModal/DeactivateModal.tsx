import { Button, Typography } from "@mui/material";
import { Modal } from "../../../../../components/Modal";
import { useDeactivateModal } from "./hooks/useDeactivateModal";

export interface IDeactivateModalProps {
  asset: IAssetResponseApi | null;
  open: boolean;
  onClose(): void;
}

export const DeactivateModal: React.FC<IDeactivateModalProps> = ({
  asset,
  open,
  onClose,
}) => {
  const { submit } = useDeactivateModal({
    asset,
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
