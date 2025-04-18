import { Product } from "@/api/product";
import { AppTheme } from "@/constants/appTheme";
import { useDrinkingCatalog } from "@/hooks/contexts/useCatalogContext";
import { AppDispatch, RootState } from "@/store";
import { addItem, CartItem, removeItem, updateQuantity } from "@/store/cartSlice";
import { CalculateDiscount, ItemQuantity } from "@/utils/CaculateDiscount";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

const WaterCatalogSubmitButton = () => {
    const theme = useTheme<AppTheme>();
    const router = useRouter();

    const { catalogBrands, GetBarcodesQuantity, getQuantity, getTotalQuantity } =
        useDrinkingCatalog();
    const productBarcodes = GetBarcodesQuantity();

    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

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

    const totalPrice = useMemo(() => {
        return productsQuantity.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    }, [productsQuantity]);

    const discounts = useSelector((state: RootState) => state.discounts);
    const discountAmount = useMemo(() => {
        return CalculateDiscount(
            productsQuantity.map(
                (x): ItemQuantity => ({
                    id: x.id,
                    quantity: x.quantity,
                })
            ),
            discounts
        );
    }, [productsQuantity]);

    // useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
    // seemore : https://react.dev/reference/react/useMemo
    const netPrice = useMemo(() => totalPrice - discountAmount, [totalPrice, discountAmount]);

    return (
        <>
            <TouchableHighlight
                underlayColor={theme.colors.inverseSuccess}
                style={[styles.btn, { backgroundColor: theme.colors.success }]}
                onPress={() => {
                    for (const brand of catalogBrands) {
                        for (const item of brand.items) {
                            if (item.quantity > 0) {
                                const cartItem = cart.find((x) => x.barcode === item.barcode);
                                if (cartItem) {
                                    dispatch(
                                        updateQuantity({
                                            id: cartItem.id,
                                            newValue: item.quantity,
                                        })
                                    );
                                } else {
                                    const newCartProduct = cacheProducts.find(
                                        (x) => x.barcode === item?.barcode
                                    );
                                    if (newCartProduct) {
                                        dispatch(
                                            addItem({
                                                ...newCartProduct,
                                                quantity: item.quantity,
                                            })
                                        );
                                    }
                                }
                            } else {
                                const cartItem = cart.find((x) => x.barcode === item.barcode);
                                if (cartItem) dispatch(removeItem(cartItem?.id));
                            }
                        }
                    }
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
