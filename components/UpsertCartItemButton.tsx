import { Product } from "@/api/product";
import { useAppTheme } from "@/constants/appTheme";
import { AppDispatch, RootState } from "@/store";
import { updateQuantity, addItem } from "@/store/cartSlice";
import { useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export interface UpsertCartItemButtonProps {
    product: Product;
    quantity: number;
}

const UpsertCartItemButton = ({ product, quantity }: UpsertCartItemButtonProps) => {
    const theme = useAppTheme();
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const cartItem = cart.find((x) => x.id === product.id);
    const router = useRouter();

    return (
        <TouchableHighlight
            underlayColor={theme.colors.inverseSuccess}
            style={[styles.btn, { backgroundColor: theme.colors.success }]}
            onPress={() => {
                cartItem
                    ? dispatch(updateQuantity({ id: product.id, newValue: quantity }))
                    : dispatch(addItem({ ...product, quantity: quantity }));
                router.push("/cart");
            }}
        >
            <View style={{ flexDirection: "row" }}>
                <Text style={[styles.onBtn, { color: theme.colors.onSuccess }]}>
                    {cartItem ? "อัพเดต" : "ใส่ตะกร้า"}
                </Text>
                <Text
                    style={[
                        styles.onBtn,
                        {
                            color: theme.colors.onSuccess,
                            marginStart: "auto",
                        },
                    ]}
                >
                    ฿{quantity * product.unitPrice}
                </Text>
            </View>
        </TouchableHighlight>
    );
};

export default UpsertCartItemButton;

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    onBtn: {
        fontWeight: "bold",
        fontSize: 18,
    },
});
