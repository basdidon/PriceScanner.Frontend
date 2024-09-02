import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const [quantity, setQuantity] = useState(0);

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
                <View style={{ padding: 12, gap: 8 }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ marginEnd: "auto", fontSize: 32 }}>20 ฿</Text>
                        <Button
                            title="-"
                            onPress={() => setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)}
                        />
                        <Text style={{ marginHorizontal: 8, fontSize: 32 }}>{quantity}</Text>
                        <Button
                            title="+"
                            onPress={() => {
                                setQuantity(quantity + 1);
                            }}
                        />
                    </View>
                    <Button title="เพิ่มลงตะกร้า" color={"forestgreen"} />
                </View>
            }
        >
            <View style={{ borderBottomColor: "#999", borderBottomWidth: 2, paddingBottom: 8 }}>
                <Text style={styles.title}>น้ำยาล้างจาน ซันไลท์ กลิ่นมะนาว</Text>
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
            <View style={{}}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>รายละเอียด</Text>
                <Text style={styles.id_text}>-</Text>
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
