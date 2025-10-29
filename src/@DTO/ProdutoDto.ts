import { ClienteDto } from './ClienteDto'
export interface ProdutoDto {
    id: number
    nome: string
    descricao: string
    preco: number
    ativo: boolean | null
    dataCadastro: string
    clienteId: ClienteDto['id']
}
