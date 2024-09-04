import { useContext, useState } from "react";
import { View } from "react-native";
import { Redirect, useLocalSearchParams } from "expo-router";
import { Text, IconButton, Button, MD2Colors as Colors } from "react-native-paper";
import { useRouter } from "expo-router";
import { useAppSelector, useAppDispatch } from "../hooks";
import { addItem } from "@/features/cart/cartSlice";
import ProductScrollview, { ProductContext } from "@/components/ProductScrollview";
import { useQueryClient } from "@tanstack/react-query";

type Product = {
    id: string;
    name: string;
    buyPrice: number;
    unitPrice: number;
    description?: string;
};

export default function DetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const rounter = useRouter();
    const dispatch = useAppDispatch();

    // if item is already in cart then redirect to /cart/[id]
    const cartItem = useAppSelector((state) => state.cart.items.find((item) => item.id == id));
    if (cartItem) return <Redirect href={{ pathname: "/cart/[id]", params: { id } }} />;

    const [quantity, setQuantity] = useState(1);

    const queryClient = useQueryClient();
    const product: Product | undefined = useContext(ProductContext);
    const new_product = queryClient.getQueryData(["product", id]) as Product;

    return (
        <ProductScrollview id={id} refreshOnFocus>
            <View
                style={{
                    paddingHorizontal: 12,
                    paddingVertical: 24,
                    gap: 12,
                    backgroundColor: "#f5f5f5",
                }}
            >
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ marginEnd: "auto", fontSize: 32, fontWeight: "bold" }}>
                        {quantity * (new_product ? new_product.unitPrice : 0)} ,
                        {new_product.unitPrice} ฿
                    </Text>
                    <IconButton
                        icon={"minus"}
                        mode="contained"
                        containerColor={Colors.green300}
                        iconColor={Colors.white}
                        onPress={() => setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)}
                    />
                    <Text style={{ marginHorizontal: 8, fontSize: 32 }}>{quantity}</Text>
                    <IconButton
                        icon={"plus"}
                        mode="contained"
                        containerColor={Colors.green300}
                        iconColor={Colors.white}
                        onPress={() => {
                            setQuantity(quantity + 1);
                        }}
                    />
                </View>
                <Button
                    icon={"cart"}
                    mode="contained"
                    buttonColor={Colors.green500}
                    onPress={() => {
                        dispatch(
                            addItem({
                                id: product.id,
                                name: product.name,
                                quantity: quantity,
                                unitPrice: product.unitPrice,
                            })
                        );
                        rounter.back();
                    }}
                >
                    เพิ่มลงในตะกร้า
                </Button>
            </View>
        </ProductScrollview>
    );
}
