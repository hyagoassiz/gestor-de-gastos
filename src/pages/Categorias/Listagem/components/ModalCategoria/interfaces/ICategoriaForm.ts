export type ICategoriaForm = Omit<ICategoriaApi, "tipo"> & {
  tipo: ICategoriaTypeApi;
};
