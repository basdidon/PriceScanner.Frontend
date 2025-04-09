import { localImageMap } from "@/constants/LocalImageMap";
import { useWaterCatalog } from "@/hooks/contexts/useCatalogContext";
import { View, Image } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
/*
export interface WaterBrandCardListItemProps {
    id: string;
}*/
const WaterBrandCardListItem = ({ id }: { id: string }) => {
    const localSource = localImageMap[id];
    const { getItem, getQuantity, setQuantity } = useWaterCatalog();
    const item = getItem(id);
    const quantity = getQuantity(id);
    //const [quantity, setQuantity] = useState<number>(0);

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
                            ฿{item?.unitPrice}
                        </Text>
                    </View>
                    <IconButton
                        size={12}
                        mode="outlined"
                        icon={"minus"}
                        disabled={quantity <= 0}
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
