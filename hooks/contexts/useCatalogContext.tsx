import { Product } from "@/api/product";
import { AppDispatch, RootState } from "@/store";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { CalculateDiscount, ItemQuantity } from "@/utils/CaculateDiscount";
import { CartItem, removeItem, setItem } from "@/store/cartSlice";

interface CatalogContext {
    getQuantity: (barcode: string) => number;
    setQuantity: (barcode: string, qauntity: number) => void;
    totalQuantity: number;
    totalPrice: number;
    discountAmount: number;
    netPrice: number;
    submit: () => void;
}

var CatalogContext = createContext<CatalogContext | undefined>(undefined);

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch<AppDispatch>();
    const cart = useSelector((state: RootState) => state.cart);
    const discounts = useSelector((state: RootState) => state.discounts);

    const [quantityRecord, setQuantityRecord] = useState<Record<string, number>>({});

    const getQuantity = (barcode: string) => {
        return quantityRecord[barcode] ?? 0;
    };

    const setQuantity = (barcode: string, quantity: number) => {
        setQuantityRecord((prev) => ({
            ...prev,
            [barcode]: quantity,
        }));
    };

    const totalQuantity = Object.values(quantityRecord).reduce(
        (sum, quantity) => sum + quantity,
        0
    );

    const totalPrice = useMemo(() => {
        return Object.entries(quantityRecord).reduce((sum, [barcode, quantity]) => {
            const product = queryClient.getQueryData<Product>(["products", barcode]);
            if (!product) return sum;
            return sum + quantity * product.unitPrice;
        }, 0);
    }, [quantityRecord]);

    //
    const discountAmount = useMemo(() => {
        const productsQuantity = Object.entries(quantityRecord)
            .map(([barcode, quantity]) => {
                const product = queryClient.getQueryData<Product>(["products", barcode]);
                if (!product) return undefined;
                return { id: product.id, quantity };
            })
            .filter((x): x is ItemQuantity => x !== undefined);

        return CalculateDiscount(productsQuantity, discounts);
    }, [quantityRecord, discounts]);

    //
    const netPrice = useMemo(() => totalPrice - discountAmount, [totalPrice, discountAmount]);

    const submit = () => {
        const items = Object.entries(quantityRecord)
            .map(([barcode, quantity]) => {
                const product = queryClient.getQueryData<Product>(["products", barcode]);
                if (!product) return undefined;
                return { ...product, quantity: quantity };
            })
            .filter((x): x is CartItem => x !== undefined);

        for (const item of items) {
            if (item.quantity > 0) {
                dispatch(setItem(item));
            } else {
                dispatch(removeItem(item.id));
            }
        }
    };

    return (
        <CatalogContext.Provider
            value={{
                getQuantity,
                setQuantity,
                totalQuantity,
                totalPrice,
                discountAmount,
                netPrice,
                submit,
            }}
        >
            {children}
        </CatalogContext.Provider>
    );
};

export const useCatalog = (): CatalogContext => {
    const context = useContext(CatalogContext);
    if (!context) {
        throw new Error("useCatalog must be used within a CatalogProvider");
    }
    return context;
};
