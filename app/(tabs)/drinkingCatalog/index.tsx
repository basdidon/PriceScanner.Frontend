import { View, StatusBar, StyleSheet, ScrollView } from "react-native";
import { useTheme, Surface, Text } from "react-native-paper";
import React, { useCallback, useMemo, useState } from "react";
import WaterCatalogBrandCard from "@/components/waterCatalog/WaterCatalogBrandCard";
import WaterCatalogSubmitButton from "@/components/waterCatalog/WaterCatalogSubmitButton";
import { useDrinkingCatalog } from "@/hooks/contexts/useCatalogContext";
import { useFocusEffect } from "expo-router";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { fetchProductByBarcode } from "@/api/product";

export default function WaterCatalog() {
    const theme = useTheme();
    const queryClient = useQueryClient();
    const { catalogBrands } = useDrinkingCatalog();

    // Derive barcodes only once using useMemo (to prevent recalculating on each render)
    const barcodes = useMemo(() => {
        return catalogBrands.flatMap((brand) => brand.items.map((item) => item.barcode));
    }, [catalogBrands]);
    /*
    // Use useQueries to fetch products for each barcode
    const productQueries = useQueries({
        queries: barcodes.map((barcode) => ({
            queryKey: ["productByBarcode", barcode],
            queryFn: () => fetchProductByBarcode(barcode),
        })),
    });*/

    // Prefetch product data when the screen is focused
    useFocusEffect(
        useCallback(() => {
            console.log("drinking-catalog focused.");
            /*
            barcodes.forEach((barcode) => {
                queryClient.prefetchQuery({
                    queryKey: ["productByBarcode", barcode],
                    queryFn: () => fetchProductByBarcode(barcode),
                });
            });*/

            //setProducts([...products]);
            return () => {
                console.log("drinking-catalog unfocused.");
            };
        }, [barcodes, queryClient])
    );

    // Example: render products (ignoring loading/error for now)
    //const products = productQueries.map((query) => query.data).filter((p) => p !== undefined);

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
