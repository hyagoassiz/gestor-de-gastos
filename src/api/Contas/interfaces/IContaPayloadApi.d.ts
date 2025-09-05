type IContaPayloadApi = Omit<IContaApi, "id" | "tipo"> & {
  id: string | undefined;
  tipo: IContaTypeApi["id"];
};
