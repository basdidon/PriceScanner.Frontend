import { Product } from "@/api/product";
import { useAppTheme } from "@/constants/appTheme";
import { AppDispatch, RootState } from "@/store";
import { setItem } from "@/store/cartSlice";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import ConfirmButton from "./ConfirmButton";
import Stepper from "./Stepper";

const ProductCartActionBar = ({ product }: { product: Product }) => {
    const router = useRouter();
    const theme = useAppTheme();
    const insets = useSafeAreaInsets();

    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const cartItem = cart.find((x) => x.id === product.id);

    const [quantity, setQuantity] = useState<number>(cartItem?.quantity ?? 1);

    return (
        <Surface
            elevation={1}
            style={[
                styles.surface,
                { backgroundColor: theme.colors.background, paddingBottom: insets.bottom },
            ]}
        >
            <Stepper
                value={quantity}
                onChanged={(newValue) => setQuantity(newValue)}
                minValue={1}
                buttonMode="contained-tonal"
                buttonSize={20}
                textVariant="headlineMedium"
            />
            <View style={{ flexDirection: "column", flex: 1 }}>
                <ConfirmButton
                    text={cartItem ? "อัพเดต" : "เพิ่มลงในตะกร้า"}
                    right={(btnColor, onBtnColor) => (
                        <Text variant="titleMedium" style={{ color: onBtnColor }}>
                            ฿{product.unitPrice * quantity}
                        </Text>
                    )}
                    onPress={() => {
                        dispatch(setItem({ ...product, quantity }));
                        router.push("/cart");
                    }}
                />
            </View>
        </Surface>
    );
};

export default ProductCartActionBar;

const styles = StyleSheet.create({
    surface: {
        padding: 12,
        gap: 8,
        flexDirection: "row",
    },
});
