import { CartItem } from "@/features/cart/cartSlice";
import React from "react";
import { Text, View, StatusBar, StyleSheet, Pressable } from "react-native";
import { Button, Divider, MD2Colors } from "react-native-paper";
import Animated from "react-native-reanimated";
import { useAppSelector } from "../hooks";
import { router } from "expo-router";

export default function CartScreen() {
    const cartItems: CartItem[] = useAppSelector((state) => state.cart.items);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingTop: StatusBar.currentHeight, backgroundColor: "#f80" }}>
                <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
                    ตะกร้าสินค้า
                </Text>
            </View>
            {cartItems.length === 0 ? (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", fontSize: 14, color: "#999" }}>
                        ดูเหมือนยังไม่มีสินค้าในตะกร้า
                    </Text>
                </View>
            ) : (
                <>
                    <Animated.ScrollView style={{ padding: 4 }}>
                        {cartItems.map((item) => (
                            <>
                                <Pressable
                                    onPress={() =>
                                        router.navigate({
                                            pathname: "/cart/[id]",
                                            params: { id: item.id },
                                        })
                                    }
                                >
                                    <Text>Go</Text>
                                </Pressable>
                                <View
                                    key={item.id}
                                    style={{
                                        alignItems: "center",
                                        backgroundColor: "#fff",
                                        flexDirection: "row",
                                        paddingVertical: 12,
                                    }}
                                >
                                    <Text style={styles.productQuantity}>x{item.quantity}</Text>

                                    <View style={{ padding: 4, marginStart: 4, minHeight: 68 }}>
                                        <Text style={styles.productTitle}>{item.name}</Text>
                                        <Text style={styles.productUnitPrice}>
                                            @{item.unitPrice}
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: 24,
                                            textAlignVertical: "bottom",
                                            fontWeight: "bold",
                                            marginStart: "auto",
                                            marginEnd: 16,
                                        }}
                                    >
                                        {item.unitPrice * item.quantity}
                                    </Text>
                                </View>
                                <Divider horizontalInset />
                            </>
                        ))}
                    </Animated.ScrollView>
                </>
            )}
            <View
                style={{
                    flexDirection: "row",
                    paddingHorizontal: 8,
                    paddingVertical: 12,
                    alignItems: "center",
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderTopColor: "#ddd",
                }}
            >
                <View>
                    <Text style={{ textAlign: "center", fontSize: 16 }}>
                        {`ราคารวม (${cartItems.length} รายการ) :`}
                    </Text>
                    <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                        {cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0)}
                    </Text>
                </View>
                <Button
                    mode="contained"
                    buttonColor={MD2Colors.green500}
                    style={{ marginStart: "auto" }}
                    onPress={() => console.log("checked")}
                >
                    <Text>ชำระเงิน</Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    productTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    productUnitPrice: {
        marginTop: "auto",
        fontSize: 14,
        fontWeight: "normal",
    },
    productQuantity: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#999",
        width: 32,
        height: 32,
        margin: 16,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 12,
        fontWeight: "bold",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white", // White background for the entire screen
    },
});
