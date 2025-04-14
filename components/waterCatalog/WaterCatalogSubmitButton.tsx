import { AppTheme } from "@/constants/appTheme";
import { useWaterCatalog } from "@/hooks/contexts/useCatalogContext";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";

const WaterCatalogSubmitButton = () => {
    const theme = useTheme<AppTheme>();
    const { getTotalQuantity, getTotalPrice, SetSeletedItemsToCart } = useWaterCatalog();
    const totalQuantity = getTotalQuantity();
    const totalPrice = getTotalPrice();

    return (
        <>
            <TouchableHighlight
                underlayColor={theme.colors.inverseSuccess}
                style={[styles.btn, { backgroundColor: theme.colors.success }]}
                onPress={() => SetSeletedItemsToCart()}
                disabled={totalQuantity <= 0}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {totalQuantity > 0 ? (
                        <Badge
                            style={{
                                backgroundColor: theme.colors.onSuccess,

                                alignItems: "center",
                                marginEnd: 8,
                                borderRadius: 6,
                                color: theme.colors.success,
                            }}
                        >
                            {totalQuantity}
                        </Badge>
                    ) : (
                        <></>
                    )}
                    <Text style={[styles.onBtn, { color: theme.colors.onSuccess }]}>ยืนยัน</Text>
                    <Text
                        style={[
                            styles.onBtn,
                            { color: theme.colors.onSuccess, marginStart: "auto" },
                        ]}
                    >
                        ฿{totalPrice}
                    </Text>
                </View>
            </TouchableHighlight>
        </>
    );
};
export default WaterCatalogSubmitButton;

const styles = StyleSheet.create({
    btn: {
        margin: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
    },
    onBtn: {
        fontWeight: "bold",
        fontSize: 18,
    },
});
