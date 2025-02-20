import { useContext } from "react";
import { SaldosContext } from "../context";
import { ISaldo, ISeachBar } from "../../../../shared/interfaces";

interface IUseListagem {
  saldos: ISaldo[] | undefined;
  searchBar: ISeachBar;
  handleTransferir(idConta: string): void;
}

const useListagem = (): IUseListagem => {
  const { saldos, searchBar, setOpenModalTransferir, setIdConta } =
    useContext(SaldosContext);

  function handleTransferir(idConta: string): void {
    setOpenModalTransferir((prevState) => !prevState);
    setIdConta(idConta);
  }

  return {
    saldos,
    searchBar,
    handleTransferir,
  };
};

export default useListagem;
