import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Button, Divider, Text } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import ProductCartActionBar from "@/components/ProductCartActionBar";
import { useTheme } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/api/product";

export default function DetailsScreen() {
    const theme = useTheme();

    const { id } = useLocalSearchParams();
    const router = useRouter();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["getProduct", id.toString()], // 123 is dynamic
        queryFn: fetchProduct,
    });

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
                //footerElement={<ProductCartActionBar product={data!} />}
            >
                <View style={{ backgroundColor: theme.colors.background }}>
                    <View style={{ paddingBottom: 8 }}>
                        <Text variant="headlineLarge" style={{ lineHeight: 42 }}>
                            {data?.name ?? ""}
                        </Text>
                        <Text variant="labelSmall" style={styles.id_text}>
                            ID: {id}
                        </Text>
                        <Text variant="labelSmall" style={styles.id_text}>
                            barcode: {data?.barcode}
                        </Text>
                    </View>
                    <Divider />
                    <View style={{ flexDirection: "row", marginTop: 12 }}>
                        <Text
                            variant="labelLarge"
                            style={{
                                marginEnd: "auto",
                                textAlignVertical: "bottom",
                                lineHeight: 24,
                            }}
                        >
                            ราคา / ชิ้น
                        </Text>
                        <Text
                            variant="titleLarge"
                            style={{
                                textAlignVertical: "bottom",
                                lineHeight: 24,
                                fontWeight: "bold",
                            }}
                        >
                            {data?.unitPrice ?? 0} .-
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
