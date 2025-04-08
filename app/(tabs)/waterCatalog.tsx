import { View, StatusBar, StyleSheet, ScrollView } from "react-native";
import { useTheme, Surface } from "react-native-paper";
import React from "react";
import WaterCatalogBrandCard from "@/components/waterCatalog/WaterCatalogBrandCard";
import { WaterCatalogSeed } from "@/constants/WaterCatalogSeed";
import WaterCatalogSubmitButton from "@/components/waterCatalog/WaterCatalogSubmitButton";

export default function WaterCatalog() {
    const theme = useTheme();
    const catalog = WaterCatalogSeed;

    return (
        <>
            <View
                style={{
                    flex: 1,
                    padding: 8,
                    gap: 8,
                    backgroundColor: theme.colors.background,
                    paddingTop: StatusBar.currentHeight,
                }}
            >
                <ScrollView>
                    {catalog.map((x, idx) => (
                        <WaterCatalogBrandCard key={idx} {...x} />
                    ))}
                </ScrollView>
            </View>
            <Surface>
                <WaterCatalogSubmitButton totalQuantity={1} totalPrice={0} onSubmit={() => {}} />
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
