type ICategoriaPayloadApi = Omit<ICategoriaApi, "id" | "tipo"> & {
  id: string | undefined;
  tipo: ICategoriaTypeApi["id"];
};
