import { IConta } from "../../../interfaces";

export type IPayloadPersistirConta = Omit<IConta, "usuario">;
