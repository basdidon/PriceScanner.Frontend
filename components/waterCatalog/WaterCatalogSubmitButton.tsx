import { AppTheme } from "@/constants/appTheme";
import { useDrinkingCatalog } from "@/hooks/contexts/useCatalogContext";
import { RootState } from "@/store";
import { CalculateDiscount, ItemQuantity } from "@/utils/CaculateDiscount";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

const WaterCatalogSubmitButton = () => {
    const theme = useTheme<AppTheme>();
    const {
        catalogBrands,
        getItem,
        getProductByBarcode,
        getTotalQuantity,
        getTotalPrice,
        SetSeletedItemsToCart,
    } = useDrinkingCatalog();
    const totalQuantity = getTotalQuantity();
    const totalPrice = getTotalPrice();

    const router = useRouter();

    const discounts = useSelector((state: RootState) => state.discounts);
    const [discountAmount, setDiscountAmount] = useState(0);

    // useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
    // seemore : https://react.dev/reference/react/useMemo
    const netPrice = useMemo(() => totalPrice - discountAmount, [totalPrice, discountAmount]);

    useFocusEffect(
        // Callback should be wrapped in `React.useCallback` to avoid running the effect too often.
        useCallback(() => {
            // Invoked whenever the route is focused.
            console.log("catalog focused.");
            const productBarcodes = catalogBrands.flatMap((x) => x.items).map((x) => x.barcode);
            const newdiscount = CalculateDiscount(
                productBarcodes.map(
                    (x): ItemQuantity => ({
                        id: getProductByBarcode(x)?.id ?? "",
                        quantity: getItem(x)?.quantity ?? 0,
                    })
                ),
                discounts
            );
            console.log(`newdiscount:${newdiscount}`);
            setDiscountAmount(newdiscount);
            // Return function is invoked whenever the route gets out of focus.
            return () => {
                console.log("catalog unfocused.");
            };
        }, [catalogBrands, discounts])
    );

    return (
        <>
            <TouchableHighlight
                underlayColor={theme.colors.inverseSuccess}
                style={[styles.btn, { backgroundColor: theme.colors.success }]}
                onPress={() => {
                    SetSeletedItemsToCart();
                    router.push("/cart");
                }}
                disabled={netPrice <= 0}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {netPrice > 0 ? (
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
                        ฿{netPrice}
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
