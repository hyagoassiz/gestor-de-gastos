type IContaPayloadApi = Omit<
  IContaApi,
  "id" | "dataHoraCriacao" | "dataHoraAtualizacao"
> & {
  id: number | undefined;
  tipoConta: IContaTypeApi["id"];
};
