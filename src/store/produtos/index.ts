import { ProdutoDto } from '@/src/@DTO/ProdutoDto'
import { createSlice } from '@reduxjs/toolkit'
import {
    createProductThunk,
    listProductThunk,
    updateProductThunk,
} from './thunks'

const initialState = {
    loading: false,
    list: [] as ProdutoDto[],
}

export const produtosSlice = createSlice({
    name: 'produtos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listProductThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(listProductThunk.rejected, (state) => {
                state.loading = false
            })
            .addCase(listProductThunk.fulfilled, (state, action) => {
                state.loading = false
                // state.list = action.payload
            })
            .addCase(createProductThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(createProductThunk.rejected, (state) => {
                state.loading = false
            })
            .addCase(createProductThunk.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateProductThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(updateProductThunk.rejected, (state) => {
                state.loading = false
            })
            .addCase(updateProductThunk.fulfilled, (state) => {
                state.loading = false
            })
    },
})

export const {} = produtosSlice.actions
