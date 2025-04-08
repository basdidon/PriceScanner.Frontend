import { localImageMap } from "@/constants/LocalImageMap";
import { useState } from "react";
import { View, Image } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";

export interface WaterBrandCardListItemProps {
    id: string;
    label: string;
    packSize: number;
    price: number;
}
const WaterBrandCardListItem = ({ id, label, packSize, price }: WaterBrandCardListItemProps) => {
    const localSource = localImageMap[id];
    const [quantity, setQuantity] = useState<number>(0);

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
                            ฿{price}
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
