import { Product } from "@/api/product";
import { AppTheme } from "@/constants/appTheme";
import { useDrinkingCatalog } from "@/hooks/contexts/useCatalogContext";
import { RootState } from "@/store";
import { CartItem } from "@/store/cartSlice";
import { CalculateDiscount, ItemQuantity } from "@/utils/CaculateDiscount";
import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

const WaterCatalogSubmitButton = () => {
    const theme = useTheme<AppTheme>();
    const { GetBarcodesQuantity, getQuantity, getTotalQuantity } = useDrinkingCatalog();
    const productBarcodes = GetBarcodesQuantity();

    const totalQuantity = getTotalQuantity();

    const useCachedProducts = (barcodes: string[]): Product[] => {
        const queryClient = useQueryClient();

        const cachedProducts: Product[] = barcodes
            .map((barcode) => queryClient.getQueryData<Product>(["getProduct", barcode]))
            .filter((product): product is Product => product !== undefined);

        return cachedProducts;
    };
    const cacheProducts = useCachedProducts(productBarcodes.map((x) => x.barcode));
    const productsQuantity: CartItem[] = productBarcodes
        .map((x) => {
            const product = cacheProducts.find((product) => product.barcode === x.barcode);
            if (product) return { ...product, quantity: getQuantity(x.barcode) };
            return undefined;
        })
        .filter((x): x is CartItem => x !== undefined);
    const totalPrice = productsQuantity.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
    );
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

            const newdiscount = CalculateDiscount(
                productsQuantity.map(
                    (x): ItemQuantity => ({
                        id: x.id,
                        quantity: x.quantity,
                    })
                ),
                discounts
            );

            setDiscountAmount(newdiscount);
            // Return function is invoked whenever the route gets out of focus.
            return () => {
                console.log("catalog unfocused.");
            };
        }, [discounts])
    );

    return (
        <>
            <TouchableHighlight
                underlayColor={theme.colors.inverseSuccess}
                style={[styles.btn, { backgroundColor: theme.colors.success }]}
                onPress={() => {
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
