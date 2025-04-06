import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, Divider, Icon, IconButton, Surface, Text } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const [quantity, setQuantity] = useState(0);

    const footerElement = (
        <Surface elevation={3} style={{ padding: 12, gap: 8, margin: 8, borderRadius: 8 }}>
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
                <Button
                    style={{ flexGrow: 1 }}
                    mode="contained"
                    labelStyle={{ fontSize: 20, lineHeight: 32 }}
                    onPress={() => {}}
                >
                    เพิ่มลงในตะกร้า
                </Button>
            </View>
        </Surface>
    );

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
            headerImage={
                <Image
                    source={require("@/assets/images/partial-react-logo.png")}
                    style={styles.reactLogo}
                />
            }
            footerElement={footerElement}
        >
            <View>
                <View style={{ borderBottomColor: "#999", borderBottomWidth: 2, paddingBottom: 8 }}>
                    <Text variant="headlineLarge" style={{ lineHeight: 42 }}>
                        น้ำยาล้างจาน ซันไลท์ กลิ่นมะนาว
                    </Text>
                    <Text style={styles.id_text}>ID: {id}</Text>
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
                        20 ฿
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
                        {180 / 12} ฿
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>รายละเอียด</Text>
                    <Text style={styles.id_text}>-</Text>
                </View>
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
