export type ICategoriaForm = Omit<ICategoriaApi, "tipoCategoria"> & {
  tipoCategoria: ICategoriaTypeApi;
};
