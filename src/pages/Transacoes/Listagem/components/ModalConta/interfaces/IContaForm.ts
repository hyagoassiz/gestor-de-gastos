export type IContaForm = Omit<IContaPayloadApi, "tipo"> & {
  tipo: IContaTypeApi;
};
