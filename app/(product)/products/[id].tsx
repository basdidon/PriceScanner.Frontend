import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Redirect, useLocalSearchParams } from "expo-router";
import { Text, IconButton, Button, MD2Colors as Colors } from "react-native-paper";
import { useRouter } from "expo-router";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { addItemAction } from "@/features/cart/cartSlice";
import { useProductContext } from "@/components/ProductProvider";

export default function ProductScreen() {
    const { data, isFetching, refetch } = useProductContext();
    const { id } = useLocalSearchParams<{ id: string }>();
    const rounter = useRouter();
    const dispatch = useAppDispatch();

    // if item is already in cart then redirect to /cart/[id]
    const cartItem = useAppSelector((state) => state.cart.items.find((item) => item.id == id));
    if (cartItem) return <Redirect href={{ pathname: "/cart/[id]", params: { id } }} />;

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    const submit = () => {
        dispatch(
            addItemAction({
                id: data?.id ?? "",
                name: data?.name ?? "unknown",
                quantity: quantity,
                unitPrice: data?.unitPrice ?? 0,
            })
        );
        rounter.back();
    };

    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ marginEnd: "auto", fontSize: 32, fontWeight: "bold" }}>
                    {quantity * (data?.unitPrice ?? 0.5)} ฿
                </Text>
                <IconButton
                    icon={"minus"}
                    mode="contained"
                    containerColor={Colors.green300}
                    iconColor={Colors.white}
                    onPress={decreaseQuantity}
                />
                <Text style={{ marginHorizontal: 8, fontSize: 32 }}>{quantity}</Text>
                <IconButton
                    icon={"plus"}
                    mode="contained"
                    containerColor={Colors.green300}
                    iconColor={Colors.white}
                    onPress={increaseQuantity}
                />
            </View>
            <Button icon={"cart"} mode="contained" buttonColor={Colors.green500} onPress={submit}>
                เพิ่มลงในตะกร้า
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 12,
        paddingVertical: 24,
        gap: 12,
        backgroundColor: "#f5f5f5",
    },
});
