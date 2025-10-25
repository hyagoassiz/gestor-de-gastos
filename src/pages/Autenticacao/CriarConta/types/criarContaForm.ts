import { z } from "zod";
import { createAccountSchema } from "../schema/createAccountSchema";

export type CriarContaForm = z.infer<typeof createAccountSchema>;
