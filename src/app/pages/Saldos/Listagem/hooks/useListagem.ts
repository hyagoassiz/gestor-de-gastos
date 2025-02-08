import { useContext } from "react";
import { SaldosContext } from "../context";
import { ISaldo, ISeachBar } from "../../../../shared/interfaces";

interface IUseListagem {
  saldos: ISaldo[] | undefined;
  searchBar: ISeachBar;
}

const useListagem = (): IUseListagem => {
  const { saldos, searchBar } = useContext(SaldosContext);

  return {
    saldos,
    searchBar,
  };
};

export default useListagem;
