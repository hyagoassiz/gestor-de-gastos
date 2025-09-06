type IContaPayloadApi = Omit<IContaApi, "id" | "criadoEm" | "atualizadoEm"> & {
  id: number | undefined;
  tipoConta: IContaTypeApi["id"];
};
