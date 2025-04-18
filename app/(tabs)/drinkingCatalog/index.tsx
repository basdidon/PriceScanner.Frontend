import { View, StatusBar, StyleSheet, ScrollView } from "react-native";
import { useTheme, Surface, Text } from "react-native-paper";
import React, { useCallback, useMemo, useState } from "react";
import WaterCatalogBrandCard from "@/components/waterCatalog/WaterCatalogBrandCard";
import WaterCatalogSubmitButton from "@/components/waterCatalog/WaterCatalogSubmitButton";
import { useDrinkingCatalog } from "@/hooks/contexts/useCatalogContext";
import { useFocusEffect } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

export default function WaterCatalog() {
    const theme = useTheme();
    const queryClient = useQueryClient();
    const { catalogBrands } = useDrinkingCatalog();

    // Derive barcodes only once using useMemo (to prevent recalculating on each render)
    const barcodes = useMemo(() => {
        return catalogBrands.flatMap((brand) => brand.items.map((item) => item.barcode));
    }, [catalogBrands]);

    // Prefetch product data when the screen is focused
    useFocusEffect(
        useCallback(() => {
            console.log("drinking-catalog focused.");
            return () => {
                console.log("drinking-catalog unfocused.");
            };
        }, [barcodes, queryClient])
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
