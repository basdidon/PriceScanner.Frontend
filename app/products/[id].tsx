import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Divider, Text } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import ProductCartActionBar from "@/components/ProductCartActionBar";
import { useTheme } from "react-native-paper";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateQuantity } from "@/store/cartSlice";

export default function DetailsScreen() {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    const { id } = useLocalSearchParams();
    const router = useRouter();
    const theme = useTheme();

    const cartItem = cart.find((x) => x.id === id);

    const name = "น้ำยาล้างจาน ซันไลท์ กลิ่นมะนาว";
    const price = 29;

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
                <ProductCartActionBar
                    defaultQuantity={cartItem?.quantity ?? 1}
                    inCart={cart.some((i) => i.id === id)}
                    unitPrice={price}
                    addToCart={(quantity) => {
                        router.push("/cart");
                        dispatch(addItem({ id: id.toString(), name, price, quantity }));
                    }}
                    updateQuantity={(quantity) => {
                        router.push("/cart");
                        dispatch(updateQuantity({ id: id.toString(), newValue: quantity }));
                    }}
                />
            }
        >
            <View style={{ backgroundColor: theme.colors.background }}>
                <View style={{ paddingBottom: 8 }}>
                    <Text variant="headlineLarge" style={{ lineHeight: 42 }}>
                        {name}
                    </Text>
                    <Text variant="labelSmall" style={styles.id_text}>
                        ID: {id}
                    </Text>
                </View>
                <Divider />
                <View style={{ flexDirection: "row", marginTop: 12 }}>
                    <Text
                        variant="labelLarge"
                        style={{ marginEnd: "auto", textAlignVertical: "bottom", lineHeight: 24 }}
                    >
                        ราคา / ชิ้น
                    </Text>
                    <Text
                        variant="titleLarge"
                        style={{ textAlignVertical: "bottom", lineHeight: 24, fontWeight: "bold" }}
                    >
                        {price} .-
                    </Text>
                </View>
                <View style={{ marginTop: 12 }}>
                    <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                        รายละเอียด
                    </Text>
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
