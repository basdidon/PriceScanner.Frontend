import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Button, Divider, FAB, Text } from "react-native-paper";
import { View, StyleSheet, Image, StatusBar } from "react-native";
import ProductCartActionBar from "@/components/ProductCartActionBar";
import { useTheme } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { fetchProductQueryFn } from "@/api/product";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { removeItem } from "@/store/cartSlice";

const { currentHeight } = StatusBar;

export default function DetailsScreen() {
    const theme = useTheme();

    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["products", id.toString()], // 123 is dynamic
        queryFn: fetchProductQueryFn,
    });

    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const cartItem = cart.find((x) => x.id === id.toString());

    if (isLoading)
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size={"large"} />
            </View>
        );

    if (error)
        return (
            <>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>Error: {error.message}</Text>
                    <Text>product ID : {id} </Text>
                    <Button style={{ marginTop: 24 }} onPress={() => refetch()}>
                        Reload
                    </Button>
                    <Button onPress={() => router.back()}>Back</Button>
                </View>
            </>
        );

    return (
        <View style={{ flex: 1 }}>
            <ParallaxScrollView
                headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
                headerImage={
                    <Image
                        source={require("@/assets/images/partial-react-logo.png")}
                        style={styles.reactLogo}
                    />
                }
            >
                <View style={{ backgroundColor: theme.colors.background }}>
                    <View style={{ paddingBottom: 8 }}>
                        <Text variant="headlineLarge" style={{ lineHeight: 42 }}>
                            {data?.name}
                        </Text>
                        <Text variant="labelSmall" style={styles.subtitle}>
                            ID: {data?.id}
                        </Text>
                        <Text variant="labelSmall" style={styles.subtitle}>
                            barcode: {data?.barcode}
                        </Text>
                    </View>
                    <Divider />
                    <View style={{ flexDirection: "row", marginTop: 12 }}>
                        <Text variant="labelLarge" style={styles.textLabel}>
                            ราคา / ชิ้น
                        </Text>
                        <Text variant="titleLarge" style={styles.textValue}>
                            {data?.unitPrice ?? 0} .-
                        </Text>
                    </View>
                    <View style={{ marginTop: 12 }}>
                        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
                            รายละเอียด
                        </Text>
                        <Text style={styles.subtitle}>-</Text>
                    </View>
                </View>
            </ParallaxScrollView>
            {cartItem && (
                <FAB
                    icon={"trash-can"}
                    mode="flat"
                    style={{
                        position: "absolute",
                        margin: 16,
                        top: currentHeight,
                        right: 0,
                        borderRadius: 36,
                    }}
                    size="small"
                    onPress={() => {
                        dispatch(removeItem(id.toString()));
                    }}
                />
            )}
            <ProductCartActionBar product={data!} />
        </View>
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
    subtitle: {
        color: "#999",
    },
    textLabel: {
        marginEnd: "auto",
        textAlignVertical: "bottom",
        lineHeight: 24,
    },
    textValue: {
        textAlignVertical: "bottom",
        lineHeight: 24,
        fontWeight: "bold",
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
