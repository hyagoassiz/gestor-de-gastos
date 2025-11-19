import { z } from "zod";

export const loginSchema = z.object({
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
    .nonempty("Obrigatório"),

  lembrarEmail: z.boolean().optional(),
});
