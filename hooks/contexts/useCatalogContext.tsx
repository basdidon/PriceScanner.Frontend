import { fetchProduct, Product } from "@/api/product";
import { AppDispatch, RootState } from "@/store";
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
    getQuantity: (barcode: string) => number;
    setQuantity: (barcode: string, newValue: number) => void;
    getTotalQuantity: () => number;
    GetBarcodes: () => string[];
    GetBarcodesQuantity: () => { barcode: string; quantity: number }[];
}

var DrinkingCatalogContext = createContext<DrinkingCatalogContext | undefined>(undefined);

export const WaterCatalogProvider = ({ children }: { children: ReactNode }) => {
    const cart = useSelector((state: RootState) => state.cart);
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
    /*
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
*/
    const GetBarcodes = () => {
        return catalogBrands.flatMap((x) => x.items).map((x) => x.barcode);
    };

    const GetBarcodesQuantity = () => {
        return catalogBrands
            .flatMap((x) => x.items)
            .map((x) => ({ barcode: x.barcode, quantity: x.quantity }));
    };

    return (
        <DrinkingCatalogContext.Provider
            value={{
                catalogBrands,
                getItem,
                getQuantity,
                setQuantity,
                getTotalQuantity,
                GetBarcodes,
                GetBarcodesQuantity,
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
