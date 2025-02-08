import { useContext, useEffect, useState } from "react";
import { TransacoesContext } from "../../../context";
import {
  ICategoria,
  IConta,
  ITransacao,
  TypeTransacao,
} from "../../../../../../shared/interfaces";
import { useForm, UseFormReturn } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { showSnackbar } from "../../../../../../shared/redux/snackBar/actions";
import { contasService } from "../../../../../../shared/services/contas";
import { useQuery } from "@tanstack/react-query";
import { categoriasService } from "../../../../../../shared/services/categorias";
import { transacoesService } from "../../../../../../shared/services/transacoes";
import { IPayloadPersistirTransacao } from "../../../../../../shared/services/transacoes/interfaces";
import { ITransacaoForm } from "../../../interfaces";
import { initialTransacaoForm } from "../constants/constants";

interface IUseModalTransacao {
  transacaoForm: UseFormReturn<ITransacaoForm>;
  transacao: ITransacao | undefined;
  categorias: ICategoria[] | undefined;
  contas: IConta[] | undefined;
  openModalTransacao: boolean;
  isFetchingCategorias: boolean;
  onChangeTipoTransacao(tipo: TypeTransacao): void;
  onSubmit(): void;
  toggleModalTransacao(): void;
}
const useModalTransacao = (): IUseModalTransacao => {
  const {
    transacao,
    openModalTransacao,
    queryGetTransacoes,
    setTrasacao,
    setOpenModalTransacao,
  } = useContext(TransacoesContext);

  const transacaoForm = useForm<ITransacaoForm>();

  const [tipoTransacao, setTipoTransacao] = useState<TypeTransacao[]>([
    "ENTRADA",
  ]);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { mutate: mutatePersistirTransacao } =
    transacoesService.useMutationPersistirTransacao();

  const { data: categorias, isFetching: isFetchingCategorias } = useQuery({
    refetchOnWindowFocus: true,
    ...categoriasService.useQueryGetCategorias({
      tipo: tipoTransacao,
      ativo: [true],
    }),
  });

  const { data: contas } = useQuery({
    ...contasService.useQueryGetContas({
      ativo: [true],
      tipoConta: ["Conta Corrente", "Conta Corrente", "Outros", "Poupança"],
    }),
  });

  useEffect(() => {
    if (transacao?.id && openModalTransacao) {
      (Object.keys(transacao) as (keyof ITransacao)[]).forEach((key) => {
        transacaoForm.setValue(
          key as keyof ITransacaoForm,
          transacao[key] as ITransacao[keyof ITransacao]
        );
      });
      return;
    }
    transacaoForm.reset(initialTransacaoForm);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModalTransacao, transacao]);

  function onChangeTipoTransacao(tipo: TypeTransacao): void {
    if (tipo) {
      setTipoTransacao([tipo]);
    }
    transacaoForm.reset({
      ...transacaoForm.getValues(),
      tipo,
      idCategoria: undefined,
    });
  }

  function onSubmit(): void {
    transacaoForm.handleSubmit(async (data) => {
      const payload: IPayloadPersistirTransacao = {
        id: data.id ?? undefined,
        tipo: data.tipo,
        data: data.data,
        valor: data.valor,
        idCategoria: data.idCategoria,
        idConta: data.idConta,
        concluido: data.concluido ?? true,
        observacao: data.observacao ?? "",
      };
      console.log(payload);
      mutatePersistirTransacao(
        { payload: payload },
        {
          onSuccess: () => {
            toggleModalTransacao();
            queryGetTransacoes.refetch();
            dispatch(
              showSnackbar(
                !payload.id
                  ? t("PAGES.CONTAS.SNACK_BARS.CREATE")
                  : t("PAGES.CONTAS.SNACK_BARS.EDIT"),
                "success"
              )
            );
          },
        }
      );
    })();
  }

  function toggleModalTransacao(): void {
    setOpenModalTransacao((prevState) => !prevState);
    setTrasacao(undefined);
  }

  return {
    transacaoForm,
    transacao,
    categorias,
    contas,
    openModalTransacao,
    isFetchingCategorias,
    onChangeTipoTransacao,
    onSubmit,
    toggleModalTransacao,
  };
};

export default useModalTransacao;
