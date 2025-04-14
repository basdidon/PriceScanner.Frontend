import { localImageMap } from "@/constants/LocalImageMap";
import { useWaterCatalog, DrinkingCatalogItem } from "@/hooks/contexts/useCatalogContext";
import { RootState } from "@/store";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { View, Image } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";

const WaterBrandCardListItem = ({ id, barcode, label, packSize }: DrinkingCatalogItem) => {
    const localSource = localImageMap[barcode];
    const { getItem, getQuantity, setQuantity } = useWaterCatalog();
    const cart = useSelector((state: RootState) => state.cart);

    useFocusEffect(
        // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
        useCallback(() => {
            setQuantity(id ?? "", cart.find((x) => x.id === id)?.quantity ?? 0);
            return () => {};
        }, [])
    );
    if (!id) {
        return <></>;
    }

    const quantity = getQuantity(id);

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
                            ฿{getItem(id)?.unitPrice ?? 0}
                        </Text>
                    </View>
                    <IconButton
                        size={12}
                        mode="outlined"
                        icon={"minus"}
                        disabled={getQuantity(id) <= 0}
                        onPress={() => setQuantity(id, quantity - 1 < 0 ? 0 : quantity - 1)}
                    />
                    <Text variant="headlineSmall">{quantity}</Text>
                    <IconButton
                        size={12}
                        mode="outlined"
                        icon={"plus"}
                        onPress={() => setQuantity(id, quantity + 1)}
                    />
                </View>
            </Card.Content>
        </>
    );
};

export default WaterBrandCardListItem;
