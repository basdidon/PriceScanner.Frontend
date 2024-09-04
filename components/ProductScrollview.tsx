import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { useQuery } from "@tanstack/react-query";
import { useState, type PropsWithChildren } from "react";
import ParallaxScrollView from "./ParallaxScrollView";
import { Image, View, Text, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import React from "react";

type Props = PropsWithChildren<{
    id: string;
    refreshOnFocus?: boolean;
}>;

const baseUrl = "http://192.168.1.23:5000";

type Product = {
    id: string;
    name: string;
    buyPrice: number;
    unitPrice: number;
    description?: string;
};

const ProductContext = React.createContext<Product | undefined>(undefined);

const product: Product = {
    id: "fake_id",
    name: "data",
    buyPrice: 10,
    unitPrice: 20,
    description: `This is a sample product.`,
};

const ProductScrollview = ({ id, refreshOnFocus = false, children }: Props) => {
    const { data, refetch } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetch(baseUrl + `/api/products/${id}`).then((res) => res.json()),
    });

    if (refreshOnFocus) useRefreshOnFocus(refetch);

    return (
        <ProductContext.Provider value={product}>
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
                            {product.name}
                        </Text>
                        <Text style={styles.id_text}>ID: {product.id}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18, textAlignVertical: "bottom" }}>
                            ราคา / ชิ้น
                        </Text>
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
                {children}
            </ThemedView>
        </ProductContext.Provider>
    );
};

export default ProductScrollview;
export { ProductContext };

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
