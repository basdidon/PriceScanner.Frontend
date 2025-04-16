import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Button, Divider, Text } from "react-native-paper";
import { View, StyleSheet, Image } from "react-native";
import ProductCartActionBar from "@/components/ProductCartActionBar";
import { useTheme } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/api/product";

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();
    const theme = useTheme();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["getProduct", id.toString()], // 123 is dynamic
        queryFn: fetchProduct,
    });

    if (isLoading) return <ActivityIndicator />;
    if (error)
        return (
            <>
                <Text>Error: {error.message}</Text>
                <Button onPress={() => refetch()}>Reload</Button>
            </>
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
            footerElement={<ProductCartActionBar product={data!} />}
        >
            <View style={{ backgroundColor: theme.colors.background }}>
                <View style={{ paddingBottom: 8 }}>
                    <Text variant="headlineLarge" style={{ lineHeight: 42 }}>
                        {data?.name ?? ""}
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
