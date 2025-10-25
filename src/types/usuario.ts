export interface Usuario {
  nome: string;
  email: string;
  exp: number;
}

export interface UsuarioToken {
  token: string;
}

export type UsuarioCreatePayload = Omit<Usuario, "exp"> & {
  senha: string;
};

export type UsuarioLoginPayload = Pick<Usuario, "email"> &
  Pick<UsuarioCreatePayload, "senha">;
