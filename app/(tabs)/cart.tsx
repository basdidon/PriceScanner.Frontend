import React, { useCallback, useMemo, useState } from "react";
import { View, StatusBar, TouchableHighlight, StyleSheet, ScrollView } from "react-native";
import { Button, Dialog, FAB, IconButton, Portal, Surface, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { useAppTheme } from "@/constants/appTheme";
import CartItemCard from "@/components/CartItemCart";
import { CalculateDiscount, ItemQuantity } from "@/utils/CaculateDiscount";
import { useRouter } from "expo-router";

export default function CartScreen() {
    const cart = useSelector((state: RootState) => state.cart);
    const discounts = useSelector((state: RootState) => state.discounts);
    const dispatch = useDispatch<AppDispatch>();
    const theme = useAppTheme();
    const router = useRouter();

    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

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
                <Surface style={{ paddingTop: StatusBar.currentHeight }}>
                    <Text variant="headlineSmall" style={styles.headerText}>
                        ตะกร้าสินค้า
                    </Text>
                    <IconButton
                        icon={"trash-can"}
                        mode="contained"
                        style={{ position: "absolute", bottom: 0, right: 0 }}
                        onPress={() => showDialog() /*dispatch(clearCart())*/}
                        disabled={cart.length <= 0}
                    />
                </Surface>

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
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>ล้างตะกร้า</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">คุณต้องการจะล้างตะกร้าใช่หรือไม่</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>ไม่</Button>
                        <Button
                            onPress={() => {
                                dispatch(clearCart());
                                hideDialog();
                            }}
                        >
                            ใช่
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
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
