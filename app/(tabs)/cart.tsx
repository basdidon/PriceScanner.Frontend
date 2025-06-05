import CartItemCard from "@/components/CartItemCard";
import ConfirmButton from "@/components/ConfirmButton";
import { RootState } from "@/store";
import { CalculateDiscount, ItemQuantity } from "@/utils/CalculateDiscount";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function CartScreen() {
    const cart = useSelector((state: RootState) => state.cart);
    const discounts = useSelector((state: RootState) => state.discounts);
    const insets = useSafeAreaInsets();

    const totalPrice = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

    const discountAmount = useMemo(() => {
        return CalculateDiscount(
            cart.map(
                (x): ItemQuantity => ({
                    id: x.id,
                    quantity: x.quantity,
                })
            ),
            discounts
        );
    }, [cart]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {cart.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text variant="labelSmall" style={styles.emptyCartText}>
                            ดูเหมือนยังไม่มีสินค้าในตะกร้า
                        </Text>
                    </View>
                ) : (
                    <ScrollView>
                        <View
                            style={{ flex: 1, gap: 8, paddingVertical: 12, paddingHorizontal: 8 }}
                        >
                            {cart.map((item) => (
                                <CartItemCard key={item.id} {...item} />
                            ))}
                        </View>
                    </ScrollView>
                )}
            </View>
            <Surface style={{ padding: 12, paddingBottom: insets.bottom, backgroundColor: "#fff" }}>
                <View style={{ flexDirection: "row", gap: 24 }}>
                    <View style={{ flex: 2, flexDirection: "column" }}>
                        <View style={{ flex: 2, flexDirection: "row" }}>
                            <Text>ราคารวม : </Text>
                            <Text style={{ marginStart: "auto" }}>{totalPrice}</Text>
                        </View>
                        <View style={{ flex: 2, flexDirection: "row" }}>
                            <Text>ส่วนลด : </Text>
                            <Text style={{ marginStart: "auto" }}>- {discountAmount}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 3, flexDirection: "row" }}>
                        <Text variant="bodyLarge">ราคารวมสุทธิ : </Text>
                        <Text style={{ marginStart: "auto" }} variant="displayMedium">
                            {totalPrice - discountAmount}
                        </Text>
                    </View>
                </View>
                <ConfirmButton text="ยืนยัน" textAlign="center" onPress={() => {}} />
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: { padding: 8, textAlign: "center", fontWeight: "bold" },
    emptyCartText: { textAlign: "center", color: "#999" },

    fab: {
        position: "absolute",
        margin: 8,
        right: 0,
        bottom: 0,
        borderRadius: 36,
    },
    btn: {
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    onBtn: {
        fontWeight: "bold",
        fontSize: 18,
    },
});
