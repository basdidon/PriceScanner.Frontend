import React from "react";
import { View, StatusBar, TouchableHighlight, StyleSheet, ScrollView } from "react-native";
import { Card, FAB, IconButton, Surface, Text } from "react-native-paper";
import { useAppTheme } from "@/constants/appTheme";
import CartItemCard from "@/components/CartItemCart";
import { Product } from "@/api/product";

export type ProductCartItem = Product & { type: "product"; quantity: number };
export type QuantityBasedDiscountCartItem = {
    type: "quantityBased";
    discountId: string;
    appliedTo: ProductCartItem[];
    discountedPrice: number;
    appliedCount: number;
};

export type CartItem = ProductCartItem | QuantityBasedDiscountCartItem;

export default function CartScreen() {
    const theme = useAppTheme();

    // Example items
    const cartItems: CartItem[] = [
        { type: "product", id: "1", barcode: "", name: "Shampoo", unitPrice: 129, quantity: 2 },
        { type: "product", id: "2", barcode: "", name: "Lamp", unitPrice: 240, quantity: 1 },
        {
            type: "quantityBased",
            discountId: "GET 3 FOR 100",
            discountedPrice: 100,
            appliedCount: 3,
            appliedTo: [
                {
                    type: "product",
                    id: "F01",
                    barcode: "",
                    name: "Apple",
                    unitPrice: 35,
                    quantity: 3,
                },
                {
                    type: "product",
                    id: "F02",
                    barcode: "",
                    name: "Banana",
                    unitPrice: 35,
                    quantity: 6,
                },
            ],
        },
    ];

    const totalPrice = 0;
    const discountAmount = 0;

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Surface style={{ paddingTop: StatusBar.currentHeight, marginBottom: 8 }}>
                    <Text variant="headlineSmall" style={styles.headerText}>
                        ตะกร้าสินค้า
                    </Text>
                    <IconButton
                        icon={"trash-can"}
                        mode="contained"
                        style={{ position: "absolute", bottom: 0, right: 0 }}
                        onPress={() => {}}
                    />
                </Surface>

                {cartItems.length === 0 ? (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text variant="labelSmall" style={styles.emptyCartText}>
                            ดูเหมือนยังไม่มีสินค้าในตะกร้า
                        </Text>
                    </View>
                ) : (
                    <ScrollView>
                        {cartItems.map((item, idx) => (
                            <CartItemRenderer key={idx} item={item} />
                        ))}
                    </ScrollView>
                )}
                <FAB
                    icon="barcode"
                    style={styles.fab}
                    mode="flat"
                    size="medium"
                    onPress={() => {}}
                />
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

const QuantityBasedDiscountComponent = ({ item }: { item: QuantityBasedDiscountCartItem }) => (
    <>
        <Card key={item.discountId} style={{ margin: 8, marginVertical: 2, padding: 0 }}>
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
                        <Text variant="titleMedium" numberOfLines={2} style={{}}>
                            {item.discountId}
                        </Text>
                        {/*
                        <Text variant="labelSmall">{item.id}</Text>
                        <Text variant="labelSmall">{item.barcode}</Text>
                        */}
                        <Text style={{ marginTop: 4, marginBottom: 8 }} variant="labelLarge">
                            @ {100}
                        </Text>
                        <Text style={{ marginTop: 4, marginBottom: 4 }} variant="labelLarge">
                            items :
                        </Text>
                        <View style={{ paddingHorizontal: 16 }}>
                            {item.appliedTo.map((x) => (
                                <View style={{ flexDirection: "row" }}>
                                    <Text variant="labelSmall">{x.name}</Text>
                                    <Text variant="labelSmall" style={{ marginStart: "auto" }}>
                                        {x.quantity}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View
                        style={{
                            marginStart: "auto",
                            padding: 8,
                            alignItems: "center",
                            minWidth: 64,
                            minHeight: 64,
                            width: 64,
                        }}
                    >
                        <Text variant="displaySmall">{item.appliedCount}</Text>
                        <Text variant="titleSmall">
                            ฿ {item.discountedPrice * item.appliedCount}
                        </Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    </>
);

type CartItemRendererProps = {
    item: CartItem;
};
const CartItemRenderer: React.FC<CartItemRendererProps> = ({ item }) => {
    switch (item.type) {
        case "product":
            return <CartItemCard key={item.id} {...item} />;
        case "quantityBased":
            return <QuantityBasedDiscountComponent item={item} />;
        default:
            return <Text>Unknown item type</Text>;
    }
};
