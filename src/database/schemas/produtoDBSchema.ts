import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { cliente } from "./clienteDBSchema";

export const produto = sqliteTable("Produto", {
    id: integer("Id").primaryKey({ autoIncrement: true }),
    nome: text("Nome").notNull(),
    preco: text("Preco").notNull(),
    descricao: text("Descricao").notNull(),
    dataCadastro: text("DataCadastro").notNull(),
    ativo: integer("Ativo", { mode: "boolean" }).default(false),
    clienteId: integer("ClienteId").references(() => cliente.id)
});