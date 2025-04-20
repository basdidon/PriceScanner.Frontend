import { StyleSheet, ScrollView } from "react-native";
import { Badge, Text } from "react-native-paper";
import React, { useCallback, useMemo } from "react";
import WaterCatalogBrandCard from "@/components/waterCatalog/WaterCatalogBrandCard";
import WaterCatalogSubmitButton from "@/components/waterCatalog/WaterCatalogSubmitButton";
import { useDrinkingCatalog } from "@/hooks/contexts/useCatalogContext";
import { useFocusEffect } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import ScreenContainer from "@/components/ScreenContainer";
import ConfirmButton from "@/components/ConfirmButton";
import { useAppTheme } from "@/constants/appTheme";

export default function WaterCatalog() {
    const theme = useAppTheme();
    const queryClient = useQueryClient();
    const { catalogBrands, totalQuantity, netPrice } = useDrinkingCatalog();

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
            <ScreenContainer>
                <ScrollView style={{ padding: 8 }}>
                    {catalogBrands.map((x, idx) => (
                        <WaterCatalogBrandCard key={idx} {...x} />
                    ))}
                </ScrollView>
                <WaterCatalogSubmitButton />
                <ConfirmButton
                    onPress={() => {}}
                    left={
                        totalQuantity > 0 && (
                            <Badge
                                style={{
                                    backgroundColor: theme.colors.onSuccess,
                                    borderRadius: 6,
                                    color: theme.colors.success,
                                }}
                            >
                                {totalQuantity}
                            </Badge>
                        )
                    }
                    right={
                        <Text
                            style={[
                                styles.onBtn,
                                { color: theme.colors.onSuccess, marginStart: "auto" },
                            ]}
                        >
                            ฿{netPrice}
                        </Text>
                    }
                />
            </ScreenContainer>
        </>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 64,
        height: 64,
        borderRadius: 12,
    },
    onBtn: {
        fontWeight: "bold",
        fontSize: 18,
    },
});
