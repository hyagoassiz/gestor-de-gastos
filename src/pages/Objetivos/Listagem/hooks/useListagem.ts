import { useState } from "react";

interface UseListagemReturn {
  modalObjetivoOpen: boolean;
  closeModalObjetivo(): void;
  openModalObjetivo(): void;
}

const useListagem = (): UseListagemReturn => {
  const [modalObjetivoOpen, setModalObjetivoOpen] = useState<boolean>(false);

  function closeModalObjetivo(): void {
    setModalObjetivoOpen(false);
  }

  function openModalObjetivo(): void {
    setModalObjetivoOpen(true);
  }

  return { modalObjetivoOpen, closeModalObjetivo, openModalObjetivo };
};

export default useListagem;
