import { fetchProductQueryFn } from "@/api/product";
import { useCatalog } from "@/hooks/contexts/useCatalogContext";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import Stepper from "../Stepper";
import { DrinkingCatalogItem } from "@/constants/WaterCatalogSeed";
import { baseUrl } from "@/constants/baseUrl";
import { Image } from "expo-image";

const WaterBrandCardListItem = ({ barcode, label, packSize }: DrinkingCatalogItem) => {
    const { getQuantity, setQuantity } = useCatalog();
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
        queryKey: ["products", barcode],
        queryFn: fetchProductQueryFn,
    });

    return (
        <>
            <Card.Content style={{ gap: 4 }}>
                <View style={styles.container}>
                    <View style={styles.imageWrapper}>
                        {data?.thumbnailUrl && (
                            <Image
                                source={{ uri: `${baseUrl}/api/v1/images/${data.thumbnailUrl}` }}
                                style={{ flex: 1 }}
                                alt="product-image"
                                cachePolicy={"disk"}
                            />
                        )}
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.labelContainer}>
                            <Text variant="titleLarge">{label}</Text>
                            <Text variant="labelSmall">QTY: {packSize}</Text>
                        </View>
                        <Text variant="labelLarge">฿{data?.unitPrice}</Text>
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

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginVertical: 4,
    },
    contentContainer: {
        marginEnd: "auto",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "baseline",
        gap: 4,
    },
    imageWrapper: { width: 48, height: 48, borderRadius: 8, overflow: "hidden" },
});
