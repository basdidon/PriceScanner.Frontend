import { useAppTheme } from "@/app/_layout";
import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { Text } from "react-native-paper";

export interface UpsertCartItemButtonProps {
    update?: boolean;
    quantity: number;
    unitPrice: number;
    addToCart: (quantity: number) => void;
    updateQuantity: (quantity: number) => void;
}

const UpsertCartItemButton = ({
    update,
    quantity,
    unitPrice,
    addToCart,
    updateQuantity,
}: UpsertCartItemButtonProps) => {
    const theme = useAppTheme();
    return (
        <TouchableHighlight
            underlayColor={theme.colors.inverseSuccess}
            style={[styles.btn, { backgroundColor: theme.colors.success }]}
            onPress={() => (update ? updateQuantity(quantity) : addToCart(quantity))}
        >
            <View style={{ flexDirection: "row" }}>
                <Text style={[styles.onBtn, { color: theme.colors.onSuccess }]}>
                    {update ? "อัพเดต" : "ใส่ตะกร้า"}
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
                    ฿{quantity * unitPrice}
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
