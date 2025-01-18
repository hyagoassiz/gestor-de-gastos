import { ICategoria } from "../../../interfaces";

export type IPayloadPersistirCategoria = Omit<ICategoria, "usuario">;
