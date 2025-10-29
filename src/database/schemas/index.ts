import * as clienteDBSchema from "./clienteDBSchema";
import * as produtoDBSchema from "./produtoDBSchema";

export const schema = {
    ...clienteDBSchema,
    ...produtoDBSchema
}