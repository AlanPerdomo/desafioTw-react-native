import { Stack } from "expo-router";
import React from "react";

const ProductLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Produtos" }} />
      <Stack.Screen
        name="form"
        options={({ route }) => {
          const { id } = route.params as { id?: string };
          return {
            title: id ? "Editar Produto" : "Novo Produto",
          };
        }}
      />
    </Stack>
  );
};

export default ProductLayout;
