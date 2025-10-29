import { ProdutoDto } from '@/src/@DTO/ProdutoDto'
import { db, schemas } from '@/src/database'
import { ProdutoSchema } from '@/src/validations/produto.schema'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { eq, InferInsertModel } from 'drizzle-orm'
import { Alert } from 'react-native'

let products = [] as ProdutoDto[]

export const listProductThunk = createAsyncThunk(
    'produtos/list',
    async (_, { rejectWithValue }) => {
        try {
            return await db.query.produto.findMany()
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Ocorreu um erro ao criar o produto'
            Alert.alert('Erro', message)
            throw rejectWithValue(message)
        }
    }
)

export const getProductThunk = createAsyncThunk(
    'produtos/get',
    async (id: number, { rejectWithValue }) => {
        try {
            return await db.query.produto.findFirst({
                where(fields, operators) {
                    return operators.eq(fields.id, id)
                },
            })
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Ocorreu um erro ao criar o produto'
            Alert.alert('Erro', message)
            throw rejectWithValue(message)
        }
    }
)

export const createProductThunk = createAsyncThunk(
    'produtos/create',
    async (data: ProdutoSchema, { rejectWithValue }) => {
        try {
            await db.insert(schemas.produto).values({
                nome: data.name,
                preco: data.price,
                dataCadastro: new Date().toISOString(),
                ativo: data.ativo,
                clienteId: data.clienteId,
                descricao: data.description,
            })
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Ocorreu um erro ao criar o produto'
            Alert.alert('Erro', message)
            throw rejectWithValue(message)
        }
    }
)

export const updateProductThunk = createAsyncThunk(
    'produtos/update',
    async (data: ProdutoSchema, { rejectWithValue }) => {
        try {
            if (!data.id) {
                throw new Error('Id não encontrado!')
            }

            const productUpdated: InferInsertModel<typeof schemas.produto> = {
                id: data.id,
                nome: data.name,
                preco: data.price,
                dataCadastro: new Date().toISOString(),
                ativo: data.ativo,
                clienteId: data.clienteId,
                descricao: data.description,
            }

            await db.update(schemas.produto).set(productUpdated)
            return data
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Ocorreu um erro ao atualizar o produto'
            Alert.alert('Erro', message)
            throw rejectWithValue(message)
        }
    }
)

export const deleteProductThunk = createAsyncThunk(
    'produtos/delete',
    async (id: number, { rejectWithValue, dispatch }) => {
        try {
            await db.delete(schemas.produto).where(eq(schemas.produto.id, id))
            await dispatch(listProductThunk())
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Ocorreu um erro ao deletar o produto'
            Alert.alert('Erro', message)
            throw rejectWithValue(message)
        }
    }
)
