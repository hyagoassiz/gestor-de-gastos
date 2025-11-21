export interface Usuario {
  nome: string;
  sub: string;
  exp: number;
}

export interface UsuarioToken {
  token: string;
}

export type UsuarioCreatePayload = Omit<Usuario, "exp" | "sub"> & {
  email: string;
  senha: string;
};

export interface UsuarioLoginPayload {
  email: string;
  senha: string;
}
