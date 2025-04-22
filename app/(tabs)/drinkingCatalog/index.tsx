import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Badge, Surface, Text } from "react-native-paper";
import WaterCatalogBrandCard from "@/components/waterCatalog/WaterCatalogBrandCard";
import { useCatalog } from "@/hooks/contexts/useCatalogContext";
import ScreenContainer from "@/components/ScreenContainer";
import ConfirmButton from "@/components/ConfirmButton";
import { useRouter } from "expo-router";
import { DrinkingCatalogSeed } from "@/constants/WaterCatalogSeed";

export default function WaterCatalog() {
    const router = useRouter();
    const { totalQuantity, netPrice, submit } = useCatalog();

    return (
        <>
            <ScreenContainer>
                <ScrollView style={{ padding: 8, paddingHorizontal: 12 }}>
                    {DrinkingCatalogSeed.map((x, idx) => (
                        <WaterCatalogBrandCard key={idx} {...x} />
                    ))}
                </ScrollView>
                <Surface style={styles.surface}>
                    <ConfirmButton
                        text="ยืนยัน"
                        disabled={totalQuantity <= 0}
                        onPress={() => {
                            submit();
                            router.push("/cart");
                        }}
                        left={(btnColor, onBtnColor) =>
                            totalQuantity > 0 && (
                                <Badge
                                    style={[
                                        styles.totalQuantityBadge,
                                        {
                                            backgroundColor: onBtnColor,
                                            color: btnColor,
                                        },
                                    ]}
                                >
                                    {totalQuantity}
                                </Badge>
                            )
                        }
                        right={(_, onBtnColor) => (
                            <Text
                                style={[styles.onBtn, { color: onBtnColor, marginStart: "auto" }]}
                            >
                                ฿{netPrice}
                            </Text>
                        )}
                    />
                </Surface>
            </ScreenContainer>
        </>
    );
}

const styles = StyleSheet.create({
    surface: {
        padding: 8,
    },
    onBtn: {
        fontWeight: "bold",
        fontSize: 18,
    },
    totalQuantityBadge: {
        borderRadius: 6,
    },
});
