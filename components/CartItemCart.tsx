import { fetchProduct, fetchProductQueryFn } from "@/api/product";
import { baseUrl } from "@/constants/baseUrl";
import { CartItem } from "@/store/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { Image } from "expo-image";

const CartItemCard = (item: CartItem) => {
    const router = useRouter();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["products", item.id], // 123 is dynamic
        queryFn: fetchProductQueryFn,
    });

    useFocusEffect(() => {
        refetch();
    });

    return (
        <Card key={item.id} onPress={() => router.push(`/products/${item.id}`)}>
            <Card.Content>
                <View style={{ flexDirection: "row" }}>
                    <View style={stlyes.imageWrapper}>
                        {data?.thumbnailUrl && (
                            <Image
                                source={{ uri: `${baseUrl}/api/v1/images/${data.thumbnailUrl}` }}
                                style={{ flex: 1 }}
                                alt="product-image"
                                cachePolicy={"disk"}
                            />
                        )}
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text variant="titleMedium" numberOfLines={2} style={{}}>
                            {item.name}
                        </Text>
                        <Text style={{ marginTop: 4 }} variant="labelLarge">
                            @ {item.unitPrice}
                        </Text>
                    </View>
                    <View style={stlyes.rightContainer}>
                        <Text variant="displaySmall">{item.quantity}</Text>
                        <Text variant="titleSmall">฿ {item.unitPrice * item.quantity}</Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};

export default CartItemCard;

const stlyes = StyleSheet.create({
    imageWrapper: {
        width: 64,
        height: 64,
        borderRadius: 16,
        marginEnd: 12,
        overflow: "hidden",
    },
    rightContainer: {
        marginStart: "auto",
        padding: 8,
        alignItems: "center",
        minWidth: 64,
        minHeight: 64,
        width: 64,
    },
});
