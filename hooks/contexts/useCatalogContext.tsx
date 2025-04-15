import { Product } from "@/api/product";
import { AppDispatch, RootState } from "@/store";
import { useCalculateDiscount } from "@/utils/CaculateDiscount";
import { createContext, ReactNode, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateQuantity, removeItem } from "@/store/cartSlice";
import { DrinkingCatalogSeed } from "@/constants/WaterCatalogSeed";

export interface DrinkingCatalogBrand {
    name: string;
    items: DrinkingCatalogItem[];
}

export type DrinkingCatalogItem = {
    barcode: string;
    label: string;
    packSize: number;
    quantity: number;
};

interface DrinkingCatalogContext {
    catalogBrands: DrinkingCatalogBrand[];
    getItem: (barcode: string) => DrinkingCatalogItem | undefined;
    getProductByBarcode: (barcode: string) => Product | undefined;
    getQuantity: (barcode: string) => number;
    setQuantity: (barcode: string, newValue: number) => void;
    getTotalQuantity: () => number;
    getTotalPrice: () => number;
    fetchProducts: () => void;
    SetSeletedItemsToCart: () => void;
}

var DrinkingCatalogContext = createContext<DrinkingCatalogContext | undefined>(undefined);

export const WaterCatalogProvider = ({ children }: { children: ReactNode }) => {
    const cart = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();

    const [catalogBrands, setCatalogBrand] = useState<DrinkingCatalogBrand[]>(DrinkingCatalogSeed);
    const [products, setProducts] = useState<Product[]>([]);

    const getItem = (barcode: string) => {
        for (const brand of catalogBrands) {
            const item = brand.items.find((i) => i.barcode === barcode);
            if (item) return item;
        }
        return undefined;
    };

    const getProductByBarcode = (barcode: string) => {
        return products.find((x) => x.barcode === barcode);
    };

    const getQuantity = (barcode: string) => {
        for (const brand of catalogBrands) {
            const item = brand.items.find((i) => i.barcode === barcode);
            if (item) return item.quantity;
        }
        return 0;
    };

    const setQuantity = (barcode: string, newValue: number) => {
        console.log(`set quantity [${barcode}] to ${newValue}`);
        setCatalogBrand((prevBrands) =>
            prevBrands.map((brand) => ({
                ...brand,
                items: brand.items.map((item) =>
                    item.barcode === barcode ? { ...item, quantity: newValue } : item
                ),
            }))
        );
    };

    const getTotalQuantity = () => {
        return catalogBrands.reduce(
            (total, brand) => total + brand.items.reduce((sum, item) => sum + item.quantity, 0),
            0
        );
    };

    const getTotalPrice = () => {
        const totalPrice = catalogBrands.reduce(
            (total, brand) =>
                total +
                brand.items.reduce(
                    (sum, item) =>
                        sum +
                        (products.find((x) => x.barcode == item.barcode)?.unitPrice ?? 0) *
                            item.quantity,
                    0
                ),
            0
        );
        /*
        const itemsQuantity = catalogBrands
            .flatMap((brand) => brand.items)
            .filter((item) => item.quantity > 0)
            .map((item) => ({
                id: products.find((x) => x.barcode)?.id ?? "",
                quantity: item.quantity,
            }));
        const discountAmount = CalculateDiscount(itemsQuantity);
        console.log(
            `-------------------------\ntotal:${totalPrice}\ndiscountAmount: ${discountAmount}\nnetTotal:${
                totalPrice - discountAmount
            }`
        );
        return totalPrice - discountAmount;*/
        return totalPrice;
    };

    const fetchProducts = async () => {
        console.log("update price");
        const nestedProducts = await Promise.all(
            catalogBrands.map(async (brand) => {
                return await Promise.all(
                    brand.items.map(async (item) => {
                        return await fetchProductById(item.barcode);
                    })
                );
            })
        );

        const products = nestedProducts.flat(); // flattens Product[][]
        setProducts(products);
    };

    const fetchProductById = async (identifier: string): Promise<Product> => {
        const res = await fetch(`http://192.168.1.28:5000/api/v1/products/${identifier}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        return await res.json(); // Assuming it returns a `Product`
    };

    const SetSeletedItemsToCart = () => {
        for (const brand of catalogBrands) {
            for (const item of brand.items) {
                if (item.quantity > 0) {
                    const cartItem = cart.find((x) => x.barcode === item.barcode);
                    if (cartItem) {
                        dispatch(updateQuantity({ id: cartItem.id, newValue: item.quantity }));
                    } else {
                        const newCartProduct = products.find((x) => x.barcode === item?.barcode);
                        if (newCartProduct) {
                            dispatch(addItem({ ...newCartProduct, quantity: item.quantity }));
                        }
                    }
                } else {
                    const cartItem = cart.find((x) => x.barcode === item.barcode);
                    if (cartItem) dispatch(removeItem(cartItem?.id));
                }
            }
        }
    };

    return (
        <DrinkingCatalogContext.Provider
            value={{
                catalogBrands,
                getItem,
                getProductByBarcode,
                getQuantity,
                setQuantity,
                getTotalQuantity,
                getTotalPrice,
                fetchProducts,
                SetSeletedItemsToCart,
            }}
        >
            {children}
        </DrinkingCatalogContext.Provider>
    );
};

export const useDrinkingCatalog = (): DrinkingCatalogContext => {
    const context = useContext(DrinkingCatalogContext);
    if (!context) {
        throw new Error("useDrinkingCatalog must be used within a DrinkingCatalogProvider");
    }
    return context;
};
