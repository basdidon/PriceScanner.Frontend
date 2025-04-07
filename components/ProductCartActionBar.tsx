import React, { useState } from "react";
import { View } from "react-native";
import { Text, Button, Divider, IconButton, Surface } from "react-native-paper";

interface ProductCartActionBarProps {
    defaultQuantity: number;
    inCart: boolean;
    addToCart: (quantity: number) => void;
    updateQuantity: (quantity: number) => void;
}

const ProductCartActionBar = ({
    defaultQuantity,
    inCart,
    addToCart,
    updateQuantity,
}: ProductCartActionBarProps) => {
    const [quantity, setQuantity] = useState<number>(defaultQuantity);

    return (
        <Surface
            elevation={1}
            style={{
                padding: 12,
                gap: 8,
                margin: 8,
                borderRadius: 8,
            }}
        >
            <View style={{ flexDirection: "row", paddingHorizontal: 12 }}>
                <Text
                    variant="titleLarge"
                    style={{
                        paddingTop: 4,
                        //backgroundColor: "red",
                        textAlignVertical: "top",
                        marginEnd: "auto",
                        lineHeight: 24,
                    }}
                >
                    ราคารวม
                </Text>
                <Text
                    variant="displayMedium"
                    style={{ marginHorizontal: 8, textAlignVertical: "bottom" }}
                >
                    {quantity * 20}
                </Text>
            </View>
            <Divider bold />
            <View style={{ flexDirection: "row", gap: 8 }}>
                <IconButton
                    size={32}
                    icon="minus"
                    mode="contained-tonal"
                    disabled={quantity == 1}
                    onPress={() => setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)}
                />
                <Text variant="displaySmall" style={{ textAlignVertical: "center" }}>
                    {quantity}
                </Text>
                <IconButton
                    size={32}
                    icon="plus"
                    mode="contained-tonal"
                    onPress={() => {
                        setQuantity(quantity + 1);
                    }}
                />
                {inCart ? (
                    <Button
                        style={{ flexGrow: 1 }}
                        mode="contained"
                        labelStyle={{ fontSize: 20, lineHeight: 32 }}
                        onPress={() => updateQuantity(quantity)}
                    >
                        อัพเดตตะกร้า
                    </Button>
                ) : (
                    <Button
                        style={{ flexGrow: 1 }}
                        mode="contained"
                        labelStyle={{ fontSize: 20, lineHeight: 32 }}
                        onPress={() => addToCart(quantity)}
                    >
                        เพิ่มลงในตะกร้า
                    </Button>
                )}
            </View>
        </Surface>
    );
};

export default ProductCartActionBar;
