import { fetchProduct, Product } from "@/api/product";
import { localImageMap } from "@/constants/LocalImageMap";
import { DrinkingCatalogItem, useDrinkingCatalog } from "@/hooks/contexts/useCatalogContext";
import { RootState } from "@/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { View, Image } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import Stepper from "../ProductSelector";

const WaterBrandCardListItem = ({ barcode, label, packSize }: DrinkingCatalogItem) => {
    const localSource = localImageMap[barcode];
    const { getQuantity, setQuantity } = useDrinkingCatalog();
    const cart = useSelector((state: RootState) => state.cart);

    useFocusEffect(
        // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
        useCallback(() => {
            const cartItem = cart.find((x) => x.barcode === barcode);
            setQuantity(barcode, cartItem?.quantity ?? 0);
            return () => {};
        }, [cart])
    );

    const quantity = getQuantity(barcode);

    const { data } = useQuery({
        queryKey: ["getProduct", barcode],
        queryFn: fetchProduct,
    });

    return (
        <>
            <Card.Content style={{ gap: 12 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        marginVertical: 8,
                    }}
                >
                    <Image
                        source={localSource}
                        style={{ width: 60, height: 60 }}
                        alt="product-image"
                    />

                    <View style={{ marginEnd: "auto" }}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "baseline",
                            }}
                        >
                            <Text variant="titleLarge" style={{ marginStart: 8 }}>
                                {label}
                            </Text>
                            <Text variant="labelSmall" style={{ marginStart: 8 }}>
                                QTY: {packSize}
                            </Text>
                        </View>
                        <Text
                            variant="labelLarge"
                            style={{
                                marginStart: 8,
                                marginTop: 8,
                                marginEnd: "auto",
                            }}
                        >
                            ฿{data?.unitPrice}
                        </Text>
                    </View>
                    <Stepper
                        value={quantity}
                        onChanged={(value) => setQuantity(barcode, value)}
                        minValue={0}
                    />
                </View>
            </Card.Content>
        </>
    );
};

export default WaterBrandCardListItem;
