import { z } from "zod";

export const createAccountSchema = z
  .object({
    nome: z
      .string({
        required_error: "Obrigatório",
      })
      .nonempty("Obrigatório"),
    email: z
      .string({
        required_error: "Obrigatório",
      })
      .nonempty("Obrigatório")
      .email("Formato de e-mail inválido")
      .toLowerCase(),

    senha: z
      .string({
        required_error: "Obrigatório",
      })
      .nonempty("Obrigatório")
      .min(6, "A senha precisa de no mínimo 6 caracteres"),

    confirmarSenha: z
      .string({
        required_error: "Obrigatório",
      })
      .nonempty("Obrigatório"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });
