import {
  Usuario,
  UsuarioCreatePayload,
  UsuarioLoginPayload,
  UsuarioToken,
} from "@/types";
import { api } from "../constants/api";

export const usuariosApi = {
  criar: async (body: UsuarioCreatePayload): Promise<Usuario> => {
    const response = await api.post("/usuarios/criar-conta", body);
    return response.data;
  },

  login: async (body: UsuarioLoginPayload): Promise<UsuarioToken> => {
    const response = await api.post("/usuarios/login", body);
    return response.data;
  },
};
