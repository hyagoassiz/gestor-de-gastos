import { z } from "zod";

export const cadastroSchema = z
  .object({
    email: z
      .string()
      .nonempty("O e-mail é obrigatório")
      .email("Formato de e-mail inválido")
      .toLowerCase(),
    password: z
      .string()
      .nonempty("Informe sua senha")
      .min(6, "A senha precisa de no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .nonempty("Informe sua senha")
      .min(6, "A senha precisa de no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
