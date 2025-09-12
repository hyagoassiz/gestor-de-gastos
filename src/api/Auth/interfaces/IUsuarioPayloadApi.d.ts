type IUsuarioPayloadApi = Omit<IUsuarioApi, "iat" | "exp"> & { senha: string };
