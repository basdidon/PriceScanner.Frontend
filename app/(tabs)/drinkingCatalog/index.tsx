import { View, StatusBar, StyleSheet, ScrollView } from "react-native";
import { useTheme, Surface } from "react-native-paper";
import React from "react";
import WaterCatalogBrandCard from "@/components/waterCatalog/WaterCatalogBrandCard";
import WaterCatalogSubmitButton from "@/components/waterCatalog/WaterCatalogSubmitButton";
import { useWaterCatalog } from "@/hooks/contexts/useCatalogContext";

export default function WaterCatalog() {
    const theme = useTheme();
    const { catalogBrands } = useWaterCatalog();

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
