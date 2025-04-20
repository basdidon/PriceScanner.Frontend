import { fetchProduct, Product } from "@/api/product";
import { AppDispatch, RootState } from "@/store";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateQuantity, removeItem } from "@/store/cartSlice";
import { DrinkingCatalogSeed } from "@/constants/WaterCatalogSeed";
import { useQueryClient } from "@tanstack/react-query";
import { CalculateDiscount, ItemQuantity } from "@/utils/CaculateDiscount";

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
    getQuantity: (barcode: string) => number;
    setQuantity: (barcode: string, newValue: number) => void;
    getTotalQuantity: () => number;
    totalQuantity: number;
    GetBarcodes: () => string[];
    GetBarcodesQuantity: () => { barcode: string; quantity: number }[];
    //
    totalPrice: number;
    discountAmount: number;
    netPrice: number;
}

var DrinkingCatalogContext = createContext<DrinkingCatalogContext | undefined>(undefined);

export const WaterCatalogProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const cart = useSelector((state: RootState) => state.cart);
    const discounts = useSelector((state: RootState) => state.discounts);
    const dispatch = useDispatch<AppDispatch>();

    const [catalogBrands, setCatalogBrand] = useState<DrinkingCatalogBrand[]>(DrinkingCatalogSeed);

    const getItem = (barcode: string) => {
        for (const brand of catalogBrands) {
            const item = brand.items.find((i) => i.barcode === barcode);
            if (item) return item;
        }
        return undefined;
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

    const totalQuantity = catalogBrands.reduce(
        (total, brand) => total + brand.items.reduce((sum, item) => sum + item.quantity, 0),
        0
    );

    const GetBarcodes = () => {
        return catalogBrands.flatMap((x) => x.items).map((x) => x.barcode);
    };
    const barcodes = catalogBrands.flatMap((x) => x.items).map((x) => x.barcode);

    const GetBarcodesQuantity = () => {
        return catalogBrands
            .flatMap((x) => x.items)
            .map((x) => ({ barcode: x.barcode, quantity: x.quantity }));
    };

    const BarcodesWithQuantity = catalogBrands
        .flatMap((x) => x.items)
        .map((x) => ({ barcode: x.barcode, quantity: x.quantity }));

    const totalPrice = useMemo(() => {
        return catalogBrands
            .flatMap((brand) => brand.items)
            .reduce((sum, item) => {
                const product = queryClient.getQueryData<Product>(["getProduct", item.barcode]);
                if (!product) return sum;
                return sum + item.quantity * product.unitPrice;
            }, 0);
    }, [catalogBrands]);

    const discountAmount = useMemo(() => {
        const productsQuantity = catalogBrands
            .flatMap((brand) => brand.items)
            .map((item) => {
                const product = queryClient.getQueryData<Product>(["getProduct", item.barcode]);
                if (!product) return undefined;
                return { id: product.id, quantity: item.quantity };
            })
            .filter((x): x is ItemQuantity => x !== undefined);

        return CalculateDiscount(productsQuantity, discounts);
    }, [catalogBrands, discounts]);

    const netPrice = useMemo(() => totalPrice - discountAmount, [totalPrice, discountAmount]);

    return (
        <DrinkingCatalogContext.Provider
            value={{
                catalogBrands,
                getItem,
                getQuantity,
                setQuantity,
                totalQuantity,
                getTotalQuantity,
                GetBarcodes,
                GetBarcodesQuantity,
                //
                totalPrice,
                discountAmount,
                netPrice,
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
