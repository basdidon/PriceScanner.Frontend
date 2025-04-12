import React from "react";
import { View, StatusBar, TouchableHighlight, StyleSheet } from "react-native";
import { FAB, IconButton, Surface, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { useAppTheme } from "@/constants/appTheme";
import CartItemCard from "@/components/CartItemCart";
import { CalculateDiscount, ItemQuantity } from "@/utils/CaculateDiscount";

export default function CartScreen() {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const theme = useAppTheme();

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountAmount = CalculateDiscount(
        cart.map(
            (x): ItemQuantity => ({
                id: x.id,
                quantity: x.quantity,
            })
        )
    );

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Surface style={{ paddingTop: StatusBar.currentHeight }}>
                    <Text variant="headlineSmall" style={styles.headerText}>
                        ตะกร้าสินค้า
                    </Text>
                    <IconButton
                        icon={"trash-can"}
                        mode="contained"
                        style={{ position: "absolute", bottom: 0, right: 0 }}
                        onPress={() => dispatch(clearCart())}
                    />
                </Surface>
                <FAB
                    icon="barcode"
                    style={styles.fab}
                    mode="flat"
                    size="medium"
                    onPress={() => console.log("Pressed")}
                />
                {cart.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text variant="labelSmall" style={styles.emptyCartText}>
                            ดูเหมือนยังไม่มีสินค้าในตะกร้า
                        </Text>
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        {cart.map((item) => (
                            <CartItemCard key={item.id} {...item} />
                        ))}
                    </View>
                )}
            </View>
            <Surface style={{ padding: 12 }}>
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
                <TouchableHighlight
                    underlayColor={theme.colors.inverseSuccess}
                    style={[
                        styles.btn,
                        {
                            backgroundColor: theme.colors.success,
                        },
                    ]}
                    onPress={() => {}}
                >
                    <Text
                        style={[
                            styles.onBtn,
                            {
                                color: theme.colors.onSuccess,
                            },
                        ]}
                    >
                        ยืนยัน
                    </Text>
                </TouchableHighlight>
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
