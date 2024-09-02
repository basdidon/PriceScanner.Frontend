import { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Text, IconButton, Button, MD2Colors as Colors } from "react-native-paper";

type Product = {
    id: string;
    name: string;
    buyPrice: number;
    unitPrice: number;
    description?: string;
};

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const [quantity, setQuantity] = useState(1);

    const product: Product = {
        id: "885121554400",
        name: "Sample Product",
        buyPrice: 50,
        unitPrice: 70,
        description: "This is a sample product.",
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
            headerImage={
                <Image
                    source={require("@/assets/images/partial-react-logo.png")}
                    style={styles.reactLogo}
                />
            }
            footerElement={
                <View
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 24,
                        gap: 12,
                        backgroundColor: "#f5f5f5",
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginEnd: "auto", fontSize: 32, fontWeight: "bold" }}>
                            {quantity * product.unitPrice} ฿
                        </Text>
                        <IconButton
                            icon={"minus"}
                            mode="contained"
                            containerColor={Colors.green300}
                            iconColor={Colors.white}
                            onPress={() => setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)}
                        />
                        <Text style={{ marginHorizontal: 8, fontSize: 32 }}>{quantity}</Text>
                        <IconButton
                            icon={"plus"}
                            mode="contained"
                            containerColor={Colors.green300}
                            iconColor={Colors.white}
                            onPress={() => {
                                setQuantity(quantity + 1);
                            }}
                        />
                    </View>
                    <Button
                        icon={"cart"}
                        mode="contained"
                        buttonColor={Colors.green500}
                        onPress={() => setQuantity(10)}
                    >
                        เพิ่มลงในตะกร้า
                    </Button>
                </View>
            }
        >
            <View style={{ borderBottomColor: "#999", borderBottomWidth: 2, paddingBottom: 8 }}>
                <Text style={styles.title} numberOfLines={2} lineBreakMode="tail">
                    {product.name}
                </Text>
                <Text style={styles.id_text}>ID: {product.id}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 18, textAlignVertical: "bottom" }}>ราคา / ชิ้น</Text>
                <Text
                    style={{
                        marginStart: "auto",
                        fontSize: 24,
                        fontWeight: "bold",
                        textAlignVertical: "bottom",
                    }}
                >
                    {product.unitPrice} ฿
                </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 18, textAlignVertical: "bottom", color: "#999" }}>
                    ราคาส่ง / ชิ้น
                </Text>
                <Text
                    style={{
                        marginStart: "auto",
                        fontSize: 24,
                        fontWeight: "bold",
                        textAlignVertical: "bottom",
                        color: "#999",
                    }}
                >
                    {product.buyPrice} ฿
                </Text>
            </View>
            <View style={{}}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>รายละเอียด</Text>
                <Text style={styles.id_text}>{product.description ?? "-"}</Text>
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: "#808080",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        lineHeight: 36,
    },
    id_text: {
        fontSize: 12,
        color: "#999",
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
