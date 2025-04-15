import { View, StatusBar, StyleSheet, ScrollView } from "react-native";
import { useTheme, Surface } from "react-native-paper";
import React, { useCallback, useState } from "react";
import WaterCatalogBrandCard from "@/components/waterCatalog/WaterCatalogBrandCard";
import WaterCatalogSubmitButton from "@/components/waterCatalog/WaterCatalogSubmitButton";
import { useDrinkingCatalog } from "@/hooks/contexts/useCatalogContext";
import { useFocusEffect } from "expo-router";

export default function WaterCatalog() {
    const theme = useTheme();
    const { catalogBrands, fetchProducts } = useDrinkingCatalog();

    useFocusEffect(
        // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
        useCallback(() => {
            // Invoked whenever the route is focused.
            console.log("drinking-catalog focused.");
            fetchProducts();
            // Return function is invoked whenever the route gets out of focus.
            return () => {
                console.log("drinking-catalog unfocused.");
            };
        }, [])
    );
    return (
        <>
            <View
                style={{
                    flex: 1,
                    gap: 8,
                    backgroundColor: theme.colors.background,
                    paddingTop: StatusBar.currentHeight,
                }}
            >
                <ScrollView style={{ padding: 8 }}>
                    {catalogBrands.map((x, idx) => (
                        <WaterCatalogBrandCard key={idx} {...x} />
                    ))}
                </ScrollView>
            </View>
            <Surface>
                <WaterCatalogSubmitButton />
            </Surface>
        </>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 64,
        height: 64,
        borderRadius: 12,
    },
});
