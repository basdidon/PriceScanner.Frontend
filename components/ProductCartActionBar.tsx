import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, IconButton, Surface } from "react-native-paper";
import UpsertCartItemButton, { UpsertCartItemButtonProps } from "./UpsertCartItemButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Stepper from "./ProductSelector";

type ProductCartActionBarProps = Omit<UpsertCartItemButtonProps, "quantity">;

const ProductCartActionBar = ({ product }: ProductCartActionBarProps) => {
    const cart = useSelector((state: RootState) => state.cart);
    const cartItem = cart.find((x) => x.id === product.id);
    const [quantity, setQuantity] = useState<number>(cartItem?.quantity ?? 1);

    return (
        <Surface
            elevation={1}
            style={{
                padding: 12,
                gap: 8,
            }}
        >
            <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <Stepper
                    value={quantity}
                    onChanged={(newValue) => setQuantity(newValue)}
                    minValue={1}
                    buttonMode="contained-tonal"
                    buttonSize={20}
                    textVariant="headlineMedium"
                />
                <UpsertCartItemButton quantity={quantity} product={product} />
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
