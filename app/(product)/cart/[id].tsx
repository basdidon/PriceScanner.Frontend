import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text, IconButton, Button, MD2Colors as Colors } from "react-native-paper";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateItemQuantityAction, removeItemAction } from "@/features/cart/cartSlice";
import { useProductContext } from "@/components/ProductProvider";

export default function ProductCartScreen() {
    const { data, isFetching, refetch } = useProductContext();
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const cartQuantity = useAppSelector(
        (state) => state.cart.items.find((item) => item.id === id)?.quantity
    );
    const [quantity, setQuantity] = useState(cartQuantity ?? 0);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity - 1 < 0 ? 0 : quantity - 1);
    const updateItemQuantity = () => {
        dispatch(updateItemQuantityAction({ id, quantity }));
        router.back();
    };
    const removeItem = () => {
        dispatch(removeItemAction({ id }));
        router.back();
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
            {quantity > 0 ? (
                <Button
                    icon={"cart"}
                    mode="contained"
                    buttonColor={Colors.green500}
                    onPress={updateItemQuantity}
                >
                    เพิ่มลงในตะกร้า
                </Button>
            ) : (
                <Button mode="contained" buttonColor={Colors.red500} onPress={removeItem}>
                    ลบออก
                </Button>
            )}
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
