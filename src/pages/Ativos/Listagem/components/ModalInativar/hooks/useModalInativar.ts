import { useNotification } from "../../../../../../hooks/useNotification";
import { useLoading } from "../../../../../../hooks/useLoading";
import { useQueryClient } from "@tanstack/react-query";
import { updateAtivoStatus } from "../../../../../../api/Ativos/updateAtivoStatus";
import { KEY_GET_ATIVOS } from "../../../../../../api/Ativos/utils/getQueryOptionsGetAtivos";

export interface IUseModalInativarProps {
  ativo: IAtivoResponseApi | null;
  onClose(): void;
}

export interface IUseModalInativarReturn {
  submit(): Promise<void>;
}

export const useModalInativar = ({
  ativo,
  onClose,
}: IUseModalInativarProps): IUseModalInativarReturn => {
  const { showSnackBar } = useNotification();

  const { setLoading } = useLoading();

  const queryClient = useQueryClient();

  async function submit(): Promise<void> {
    if (!ativo) {
      return;
    }

    try {
      setLoading(true);

      await updateAtivoStatus({ id: ativo?.id, ativo: false });

      queryClient.invalidateQueries({ queryKey: [KEY_GET_ATIVOS] });

      showSnackBar("Ativo inativado com sucesso", "success");

      onClose();
    } catch (error) {
      console.error(error);
      showSnackBar(String(error), "error");
    } finally {
      setLoading(false);
    }
  }

  return {
    submit,
  };
};
