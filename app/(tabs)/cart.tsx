import { useCart } from "@/hooks/useCartContext";
import React from "react";
import { View, StatusBar } from "react-native";
import { IconButton, Surface, Text } from "react-native-paper";

export default function CartScreen() {
    const { cartItems, clearCart } = useCart();

    if (!cartItems) {
        return <Text>Loading...</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <Surface style={{ paddingTop: StatusBar.currentHeight }}>
                <Text
                    variant="headlineSmall"
                    style={{ padding: 8, textAlign: "center", fontWeight: "bold" }}
                >
                    ตะกร้าสินค้า
                </Text>
                <IconButton
                    icon={"trash-can"}
                    mode="contained"
                    style={{ position: "absolute", bottom: 0, right: 0 }}
                    onPress={clearCart}
                />
            </Surface>
            {cartItems.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", fontSize: 14, color: "#999" }}>
                        ดูเหมือนยังไม่มีสินค้าในตะกร้า
                    </Text>
                </View>
            ) : (
                <View style={{ flex: 1 }}>
                    {cartItems.map((item) => (
                        <View key={item.id} style={{ marginTop: 8 }}>
                            <Text variant="bodySmall">{item.id}</Text>
                            <Text>{item.name}</Text>
                            <Text>
                                {item.price} x {item.quantity} = {item.price * item.quantity}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}
