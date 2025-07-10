import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IIncomeModalState, IDeactivateModalState } from "../interfaces";
import { useForm, UseFormReturn } from "react-hook-form";
import { getQueryOptionsGetIncome } from "../../../../api/Income/utils/getQueryOptionsGetIncome";

interface IUseList {
  income: IIncomeResponseApi[] | undefined;
  incomeModalState: IIncomeModalState;
  deactivateModalState: IDeactivateModalState;
  filterForm: UseFormReturn<IIncomeListPayloadApi>;
  filterCount: number;
  closeIncomeModal(): void;
  closeDeactivateModal(): void;
  handleDeactivateAsset(income: IIncomeResponseApi): void;
  handleDuplicarProvento(income: IIncomeResponseApi): void;
  handleEditIncome(income: IIncomeResponseApi): void;
  handleSubmitFilterForm(): void;
  openIncomeModal(): void;
  setIncomeListPayload: Dispatch<SetStateAction<IIncomeListPayloadApi>>;
}

export const useList = (): IUseList => {
  const [incomeModalState, setIncomeModalState] = useState<IIncomeModalState>({
    income: null,
    open: false,
    isDuplicating: false,
  });

  const [deactivateModalState, setDeactivateModalState] =
    useState<IDeactivateModalState>({
      income: null,
      open: false,
      isDuplicating: false,
    });

  const [incomeListPayload, setIncomeListPayload] =
    useState<IIncomeListPayloadApi>({ ativoId: "" });

  const filterForm = useForm<IIncomeListPayloadApi>({
    defaultValues: { ativoId: incomeListPayload.ativoId },
  });

  const queryGetIncome = useQuery({
    ...getQueryOptionsGetIncome(incomeListPayload),
  });

  const filterCount: number = incomeListPayload.ativoId === "" ? 0 : 1;

  const income = useMemo(() => {
    return queryGetIncome.data;
  }, [queryGetIncome.data]);

  function openIncomeModal(): void {
    setIncomeModalState({ income: null, open: true, isDuplicating: false });
  }

  function closeIncomeModal(): void {
    setIncomeModalState({ income: null, open: false, isDuplicating: false });
  }

  function closeDeactivateModal(): void {
    setDeactivateModalState({
      income: null,
      open: false,
      isDuplicating: false,
    });
  }

  function handleDeactivateAsset(income: IIncomeResponseApi): void {
    setDeactivateModalState({ income, open: true, isDuplicating: false });
  }

  function handleDuplicarProvento(income: IIncomeResponseApi): void {
    setDeactivateModalState({ income, open: true, isDuplicating: true });
  }

  function handleEditIncome(income: IIncomeResponseApi): void {
    setIncomeModalState({ income, open: true, isDuplicating: false });
  }

  function handleSubmitFilterForm(): void {
    filterForm.handleSubmit((data) => {
      setIncomeListPayload({ ativoId: data.ativoId });
    })();
  }

  return {
    income,
    incomeModalState,
    deactivateModalState,
    filterForm,
    filterCount,
    closeIncomeModal,
    closeDeactivateModal,
    handleEditIncome,
    handleDuplicarProvento,
    handleDeactivateAsset,
    handleSubmitFilterForm,
    openIncomeModal,
    setIncomeListPayload,
  };
};
