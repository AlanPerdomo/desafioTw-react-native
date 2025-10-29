import * as Yup from "yup";

export const produtoSchema = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string().required("O nome é obrigatório"),
    price: Yup.string().required("O preco é obrigatório"),
    description: Yup.string().required("A descricao é obrigatória"),
    clienteId: Yup.number().required("O cliente é obrigatório"),
    ativo: Yup.boolean().default(false),
});

export type ProdutoSchema = Yup.InferType<typeof produtoSchema>;