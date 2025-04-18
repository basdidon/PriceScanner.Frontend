import { CartItem } from "@/store/cartSlice";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";

const CartItemCard = (item: CartItem) => {
    const router = useRouter();

    return (
        <Card key={item.id} onPress={() => router.push(`/products/${item.id}`)}>
            <Card.Content style={{ margin: 0, padding: 0 }}>
                <View style={{ flexDirection: "row" }}>
                    <View
                        style={{
                            width: 64,
                            height: 64,
                            backgroundColor: "cyan",
                            borderRadius: 16,
                            marginEnd: 12,
                        }}
                    />
                    <View style={{ flex: 1 }}>
                        <Text variant="titleMedium" numberOfLines={2} style={{}}>
                            {item.name}
                        </Text>
                        <Text style={{ marginTop: 4 }} variant="labelLarge">
                            @ {item.unitPrice}
                        </Text>
                    </View>
                    <View
                        style={{
                            marginStart: "auto",
                            padding: 8,
                            alignItems: "center",
                            minWidth: 64,
                            minHeight: 64,
                            width: 64,
                        }}
                    >
                        <Text variant="displaySmall">{item.quantity}</Text>
                        <Text variant="titleSmall">฿ {item.unitPrice * item.quantity}</Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
};

export default CartItemCard;
