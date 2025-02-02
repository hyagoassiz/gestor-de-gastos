import { useContext, useEffect } from "react";
import { TransacoesContext } from "../../../context";
import {
  ICategoria,
  IConta,
  ITransacao,
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

interface IUseModalTransacao {
  transacaoForm: UseFormReturn<ITransacao>;
  transacao: ITransacao | undefined;
  categorias: ICategoria[] | undefined;
  contas: IConta[] | undefined;
  toggleModalTransacao: boolean;
  handleToggleModalTransacao: () => void;
  onSubmit(): void;
}
const useModalTransacao = (): IUseModalTransacao => {
  const {
    toggleModalTransacao,
    setToggleModalTransacao,
    setTrasacao,
    transacao,
    queryGetTransacoes,
  } = useContext(TransacoesContext);

  const transacaoForm = useForm<ITransacao>();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { mutate: mutatePersistirTransacao } =
    transacoesService.useMutationPersistirTransacao();

  const { data: categorias } = useQuery({
    refetchOnWindowFocus: true,
    ...categoriasService.useQueryGetCategorias({
      tipo: ["ENTRADA", "SAIDA"],
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
    if (transacao?.id && toggleModalTransacao) {
      (Object.keys(transacao) as (keyof ITransacao)[]).forEach((key) => {
        transacaoForm.setValue(
          key as keyof ITransacao,
          transacao[key] as ITransacao[keyof ITransacao]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleModalTransacao, transacao]);

  function onSubmit() {
    transacaoForm.handleSubmit(async (data) => {
      const payload: IPayloadPersistirTransacao = {
        id: data.id ?? undefined,
        tipo: data.tipo,
        data: data.data,
        valor: data.valor,
        idCategoria: data.idCategoria,
        idConta: data.idConta,
        incluirSoma: data.incluirSoma ?? true,
        concluido: data.concluido ?? true,
        agencia: data.agencia ?? "",
        observacao: data.observacao ?? "",
      };
      console.log(payload);
      mutatePersistirTransacao(
        { payload: payload },
        {
          onSuccess: () => {
            handleToggleModalTransacao();
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

  function handleToggleModalTransacao() {
    setToggleModalTransacao((prevState) => !prevState);
    setTrasacao(undefined);
    transacaoForm.reset();
  }

  return {
    transacaoForm,
    transacao,
    categorias,
    contas,
    toggleModalTransacao,
    handleToggleModalTransacao,
    onSubmit,
  };
};

export default useModalTransacao;
