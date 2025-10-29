import Button from '@/src/components/Button'
import Checkbox from '@/src/components/Checkbox'
import Input from '@/src/components/Input'
import { useAppDispatch, useAppSelector } from '@/src/store'
import { listClientThunk } from '@/src/store/clientes/thunks'
import {
    createProductThunk,
    getProductThunk,
    updateProductThunk,
} from '@/src/store/produtos/thunks'
import { ProdutoSchema, produtoSchema } from '@/src/validations/produto.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Picker } from '@react-native-picker/picker'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Form = () => {
    const dispatch = useAppDispatch()
    const { list: clients } = useAppSelector((state) => state.clients)
    const { id } = useLocalSearchParams<{ id: string }>()

    const { control, handleSubmit, reset } = useForm({
        resolver: yupResolver(produtoSchema),
    })

    const handleFormSubmit = (data: ProdutoSchema) => {
        if (id) {
            dispatch(updateProductThunk(data))
                .unwrap()
                .then(() => {
                    router.back()
                    Alert.alert('Sucesso', 'Produto atualizado com sucesso')
                })
        } else {
            dispatch(createProductThunk(data))
                .unwrap()
                .then(() => {
                    router.back()
                    Alert.alert('Sucesso', 'Produto criado com sucesso')
                })
        }
    }

    useEffect(() => {
        const getProduct = () => {
            dispatch(listClientThunk())
            if (id) {
                dispatch(getProductThunk(Number(id)))
                    .unwrap()
                    .then((produto) => {
                        if (produto) {
                            reset({
                                id: produto?.id,
                                name: produto.nome,
                                price: String(produto.preco),
                                description: produto.descricao,
                                clienteId: produto.clienteId || 0,
                                ativo: produto.ativo || false,
                            })
                        } else {
                            router.back()
                            Alert.alert('Erro', 'Produto não encontrado!')
                        }
                    })
            }
        }

        getProduct()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.content}
            >
                <Text style={styles.title}>Dados do Produto</Text>

                <Controller
                    control={control}
                    name="name"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <Input
                            placeholder="Nome"
                            value={value}
                            onChangeText={onChange}
                            error={error?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="price"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <Input
                            placeholder="Preço"
                            value={value}
                            onChangeText={onChange}
                            keyboardType="numeric"
                            error={error?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="description"
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <Input
                            placeholder="Descrição"
                            value={value}
                            onChangeText={onChange}
                            error={error?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="ativo"
                    render={({ field: { onChange, value } }) => (
                        <Checkbox
                            value={value}
                            onChange={onChange}
                            label="Ativo"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="clienteId"
                    render={({ field: { onChange, value } }) => (
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                            style={{
                                marginVertical: 10,
                                borderWidth: 1,
                                borderColor: '#ccc',
                            }}
                        >
                            <Picker.Item
                                label="Selecione um cliente"
                                value={0}
                            />
                            {clients.map((client) => (
                                <Picker.Item
                                    key={client.id}
                                    label={client.nome}
                                    value={client.id}
                                />
                            ))}
                        </Picker>
                    )}
                />

                <Button
                    onPress={handleSubmit(handleFormSubmit)}
                    style={{ marginTop: 16 }}
                    label={id ? 'Salvar' : 'Cadastrar'}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Form

const styles = StyleSheet.create({
    scroll: {
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'medium',
    },
    content: {
        gap: 10,
    },
})
