import React from "react";
import { View, StatusBar, TouchableHighlight, StyleSheet } from "react-native";
import { Card, FAB, IconButton, Surface, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { useAppTheme } from "@/constants/appTheme";
import WaterCatalogSubmitButton from "@/components/waterCatalog/WaterCatalogSubmitButton";

export default function CartScreen() {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const theme = useAppTheme();

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    //const { cartItems, clearCart } = useCart();
    /*
    if (!cartItems) {
        return <Text>Loading...</Text>;
    }*/
    return (
        <View style={{ flex: 1 }}>
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
                        onPress={() => dispatch(clearCart())}
                    />
                </Surface>
                <FAB
                    icon="barcode"
                    style={{
                        position: "absolute",
                        margin: 8,
                        right: 0,
                        bottom: 0,
                        borderRadius: 36,
                    }}
                    mode="flat"
                    size="medium"
                    onPress={() => console.log("Pressed")}
                />
                {cart.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ textAlign: "center", fontSize: 14, color: "#999" }}>
                            ดูเหมือนยังไม่มีสินค้าในตะกร้า
                        </Text>
                    </View>
                ) : (
                    <View style={{ flex: 1 }}>
                        {cart.map((item) => (
                            <Card key={item.id} style={{ margin: 8, padding: 0 }}>
                                <Card.Content style={{ margin: 0, padding: 0 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View
                                            style={{
                                                width: 64,
                                                height: 64,
                                                backgroundColor: "cyan",
                                                borderRadius: 16,
                                                marginEnd: 12,
                                            }}
                                        />

                                        <View style={{ flex: 1 }}>
                                            <Text
                                                variant="titleMedium"
                                                numberOfLines={2}
                                                style={{}}
                                            >
                                                {item.name}
                                            </Text>
                                            <Text variant="labelSmall">{item.id}</Text>
                                            <Text style={{ marginTop: 4 }} variant="labelLarge">
                                                @ {item.price}
                                            </Text>
                                        </View>

                                        <View
                                            style={{
                                                marginStart: "auto",
                                                padding: 8,
                                                alignItems: "center",
                                                minWidth: 64,
                                                minHeight: 64,
                                                width: 64,
                                                //backgroundColor: "cyan",
                                            }}
                                        >
                                            <Text variant="displaySmall">{item.quantity}</Text>
                                            <Text variant="titleSmall">
                                                ฿ {item.price * item.quantity}
                                            </Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                        ))}
                    </View>
                )}
            </View>
            <Surface style={{ padding: 12 }}>
                <View style={{ flexDirection: "row" }}>
                    <Text>ราคารวม : </Text>
                    <Text style={{ marginStart: "auto" }} variant="displayMedium">
                        {totalPrice}
                    </Text>
                </View>
                <TouchableHighlight
                    underlayColor={theme.colors.inverseSuccess}
                    style={[styles.btn, { backgroundColor: theme.colors.success }]}
                    onPress={() => {}}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
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
                    </View>
                </TouchableHighlight>
            </Surface>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        marginTop: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
    },
    onBtn: {
        fontWeight: "bold",
        fontSize: 18,
    },
});
