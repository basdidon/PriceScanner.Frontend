import React, { type PropsWithChildren } from "react";
import ParallaxScrollView from "./ParallaxScrollView";
import { Image, View, Text, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { useProductContext } from "./ProductProvider";

type Props = PropsWithChildren<{
    id: string;
    refreshOnFocus?: boolean;
}>;

const ProductScrollview = ({ id, refreshOnFocus = false, children }: Props) => {
    const { data, isFetching, refetch } = useProductContext();

    return (
        <ThemedView style={styles.container}>
            <ParallaxScrollView
                headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
                headerImage={
                    <Image
                        source={require("@/assets/images/partial-react-logo.png")}
                        style={styles.reactLogo}
                    />
                }
            >
                <View
                    style={{
                        borderBottomColor: "#999",
                        borderBottomWidth: 2,
                        paddingBottom: 8,
                    }}
                >
                    <Text style={styles.title} numberOfLines={2} lineBreakMode="tail">
                        {data?.name ?? "unknown"}
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
                        {data?.unitPrice} ฿
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
                        {data?.buyPrice} ฿
                    </Text>
                </View>
                <View style={{}}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>รายละเอียด</Text>
                    <Text style={styles.id_text}>{data?.description ?? "-"}</Text>
                </View>
            </ParallaxScrollView>
            {children}
        </ThemedView>
    );
};

export default ProductScrollview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
