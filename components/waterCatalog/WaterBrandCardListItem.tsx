import { fetchProduct } from "@/api/product";
import { localImageMap } from "@/constants/LocalImageMap";
import { useWaterCatalog } from "@/hooks/contexts/useCatalogContext";
import { RootState } from "@/store";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { View, Image } from "react-native";
import { ActivityIndicator, Button, Card, IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";

const WaterBrandCardListItem = ({ id }: { id: string }) => {
    const localSource = localImageMap[id];
    const { getItem } = useWaterCatalog();
    const item = getItem(id);
    const cart = useSelector((state: RootState) => state.cart);

    const cartItem = cart.find((x) => x.id === id);

    const [quantity, setQuantity] = useState<number>(cartItem?.quantity ?? 0);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["getProduct", id],
        queryFn: fetchProduct,
    });

    if (isLoading) return <ActivityIndicator />;
    if (error)
        return (
            <>
                <Text>Error: {error.message}</Text>
                <Button onPress={() => refetch()}>Reload</Button>
            </>
        );

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
                                {item?.label}
                            </Text>
                            <Text variant="labelSmall" style={{ marginStart: 8 }}>
                                QTY: {item?.packSize}
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
                            ฿{data?.unitPrice ?? 0}
                        </Text>
                    </View>
                    <IconButton
                        size={12}
                        mode="outlined"
                        icon={"minus"}
                        disabled={quantity <= 0}
                        onPress={() => setQuantity(quantity - 1 < 0 ? 0 : quantity - 1)}
                    />
                    <Text variant="headlineSmall">{quantity}</Text>
                    <IconButton
                        size={12}
                        mode="outlined"
                        icon={"plus"}
                        onPress={() => setQuantity(quantity + 1)}
                    />
                </View>
            </Card.Content>
        </>
    );
};

export default WaterBrandCardListItem;
