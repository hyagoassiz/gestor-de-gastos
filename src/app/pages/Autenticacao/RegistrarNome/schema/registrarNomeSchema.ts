import { z } from "zod";

export const registrarNomeSchema = z.object({
  nome: z
    .string()
    .nonempty()
    .transform((value) => value.trim().replace(/\s+/g, " ")),
});
