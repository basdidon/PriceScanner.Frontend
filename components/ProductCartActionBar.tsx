import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, IconButton, Surface } from "react-native-paper";
import UpsertCartItemButton, { UpsertCartItemButtonProps } from "./UpsertCartItemButton";

type ProductCartActionBarProps = Omit<UpsertCartItemButtonProps, "quantity" | "update"> & {
    inCart: boolean;
    defaultQuantity: number;
};

const ProductCartActionBar = ({ defaultQuantity, inCart, ...rest }: ProductCartActionBarProps) => {
    const [quantity, setQuantity] = useState<number>(defaultQuantity);

    return (
        <Surface
            elevation={1}
            style={{
                padding: 12,
                gap: 8,
            }}
        >
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <View style={{ flexDirection: "row", gap: 4 }}>
                    <IconButton
                        size={20}
                        icon="minus"
                        mode="contained-tonal"
                        disabled={quantity == 1}
                        onPress={() => setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)}
                    />
                    <Text variant="headlineSmall" style={{ textAlignVertical: "center" }}>
                        {quantity}
                    </Text>
                    <IconButton
                        size={20}
                        icon="plus"
                        mode="contained-tonal"
                        onPress={() => {
                            setQuantity(quantity + 1);
                        }}
                    />
                </View>
                <UpsertCartItemButton update={inCart} quantity={quantity} {...rest} />
            </View>
        </Surface>
    );
};

export default ProductCartActionBar;

const styles = StyleSheet.create({
    onConfirmBtn: {
        color: "white",
    },
    totalOnConfirmBtn: {
        marginStart: "auto",
    },
});
