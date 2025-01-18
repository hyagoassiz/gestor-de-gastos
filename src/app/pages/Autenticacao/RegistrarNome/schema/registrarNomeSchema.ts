import { z } from "zod";

export const registrarNomeSchema = z.object({
  nome: z
    .string()
    .nonempty()
    .transform((value) => value.toLowerCase().trim().replace(/\s+/g, " ")),
});
