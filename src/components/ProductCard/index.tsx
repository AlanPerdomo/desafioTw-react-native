import { ProdutoDto } from '@/src/@DTO/ProdutoDto'
import { theme } from '@/src/theme'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Box from '../Box'
import Checkbox from '../Checkbox'

type Props = {
    product: ProdutoDto
    onRemove?: () => void
    onEdit?: () => void
}

const ProductCard = ({ product, onRemove, onEdit }: Props) => {
    return (
        <Box
            backgroundColor={theme.colors.white}
            {...theme.shadow.MD}
            borderRadius={10}
            padding={16}
        >
            <Box flexDirection="row" flex={1}>
                <Text style={{ flex: 1, fontWeight: 'bold' }}>
                    {product.nome}
                </Text>
                <Box flexDirection="row" gap={3}>
                    <TouchableOpacity
                        onPress={onEdit}
                        style={{ paddingHorizontal: 5 }}
                    >
                        <MaterialIcons
                            name="edit"
                            size={24}
                            color={theme.colors.blue[500]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onRemove}
                        style={{ paddingHorizontal: 5 }}
                    >
                        <MaterialIcons name="delete" size={24} color="red" />
                    </TouchableOpacity>
                </Box>
            </Box>
            <Text style={{ color: theme.colors.gray[400] }}>
                {product.descricao}
            </Text>
            <Box flexDirection="row" alignItems="center">
                <Checkbox
                    disabled
                    label="Ativo"
                    value={!!product.ativo}
                    onChange={() => {}}
                    style={{ flex: 1, marginTop: 10 }}
                />
                <Text style={{ fontWeight: 'bold' }}>
                    {product.clienteId
                        ? `Cliente ID: ${product.clienteId}`
                        : 'Sem Cliente'}
                </Text>
            </Box>
        </Box>
    )
}

export default ProductCard
