import { useForm } from "react-hook-form";
import { IUseProductModalProps, IUseProductModalReturn } from "../interfaces";
import { useNotification } from "../../../../../../hooks/useNotification";
import { useLoading } from "../../../../../../hooks/useLoading";
import { postProduct } from "../../../../../../api/Products/postProduct";
import dayjs from "dayjs";
import { useQueryClient } from "@tanstack/react-query";
import { KEY_GET_PRODUCTS } from "../../../../../../api/Products/hooks/useQueryGetProducts";
import { useEffect } from "react";

export const useProductModal = ({
  product,
  onClose,
}: IUseProductModalProps): IUseProductModalReturn => {
  const productForm = useForm<IProductPayloadApi>();

  const { showSnackBar } = useNotification();

  const { setLoading } = useLoading();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (product?.id) {
      (Object.keys(product) as (keyof IProductResponseApi)[]).forEach((key) => {
        productForm.setValue(
          key as keyof IProductPayloadApi,
          product[key] as IProductResponseApi[keyof IProductResponseApi]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  function submitProductForm(): void {
    productForm.handleSubmit(
      async (data) => {
        try {
          setLoading(true);

          const now = dayjs().toISOString();

          const payload: IProductPayloadApi = {
            id: data.id ?? undefined,
            nome: data.nome,
            codigo: data.codigo,
            valor: data.valor,
            quantidade: data.quantidade,
            createdAt: data.createdAt ?? now,
            updatedAt: now,
          };

          await postProduct(payload);

          showSnackBar(
            `Produto ${payload.id ? "editado" : "adicionado"} com sucesso!`,
            "success"
          );

          onClose();

          queryClient.invalidateQueries({ queryKey: [KEY_GET_PRODUCTS] });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
      () => {
        showSnackBar("Existem campos obrigatórios não preenchidos!", "error");
      }
    )();
  }

  return {
    productForm,
    submitProductForm,
  };
};
