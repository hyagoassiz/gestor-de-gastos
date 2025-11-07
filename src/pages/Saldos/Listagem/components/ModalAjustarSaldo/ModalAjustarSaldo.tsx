import { Modal } from "@/components/Modal/Modal";
import { Button } from "@mui/material";

interface ModalAjustarSaldoProps {
  open: boolean;
  onClose(): void;
}

export const ModalAjustarSaldo: React.FC<ModalAjustarSaldoProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal
      title="Transferir saldo entre contas"
      style={{ width: 400 }}
      open={open}
      buttons={<Button onClick={onClose}>Fechar</Button>}
    >
      Teste
    </Modal>
  );
};
