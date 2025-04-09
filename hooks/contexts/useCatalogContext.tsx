import { createContext, ReactNode, useContext, useState } from "react";
import { useDiscount } from "./useDiscountContext";

interface WaterCatalogBrand {
    name: string;
    items: WaterCatalogItem[];
}

interface WaterCatalogItem {
    id: string;
    label: string;
    packSize: number;
    unitPrice: number;
    quantity: number;
}

interface WaterCatalogContext {
    catalogBrands: WaterCatalogBrand[];
    getItem: (id: string) => WaterCatalogItem | undefined;
    getQuantity: (id: string) => number;
    setQuantity: (id: string, newValue: number) => void;
    getTotalQuantity: () => number;
    getTotalPrice: () => number;
}

var WaterCatalogContext = createContext<WaterCatalogContext | undefined>(undefined);

export const WaterCatalogProvider = ({ children }: { children: ReactNode }) => {
    const { getDiscount } = useDiscount();

    const [catalogBrands, setCatalogBrand] = useState<WaterCatalogBrand[]>([
        {
            name: "น้ำดื่ม ตราสิงห์",
            items: [
                {
                    id: "8850999002675",
                    label: "330 ml.",
                    unitPrice: 43,
                    packSize: 12,
                    quantity: 0,
                },
                {
                    id: "8850999321028",
                    label: "600 ml.",
                    unitPrice: 45,
                    packSize: 12,
                    quantity: 0,
                },
                { id: "8850999320021", label: "1500 ml.", unitPrice: 45, packSize: 6, quantity: 0 },
            ],
        },
        {
            name: "น้ำดื่ม ตราคริสตัล",
            items: [
                {
                    id: "8851952150808",
                    label: "350 ml.",
                    unitPrice: 45,
                    packSize: 12,
                    quantity: 0,
                },
                { id: "8851952150789", label: "600 ml.", unitPrice: 44, packSize: 12, quantity: 0 },
                { id: "8851952150796", label: "1500 ml.", unitPrice: 44, packSize: 6, quantity: 0 },
            ],
        },
        {
            name: "น้ำดื่ม ตราเนสท์เล่",
            items: [
                { id: "8850127063929", label: "330 ml.", unitPrice: 42, packSize: 12, quantity: 0 },
                { id: "8850124003874", label: "600 ml.", unitPrice: 44, packSize: 12, quantity: 0 },
                { id: "8850124003843", label: "1500 ml.", unitPrice: 44, packSize: 6, quantity: 0 },
            ],
        },
        {
            name: "น้ำดื่ม ตราฟอเรสต์",
            items: [
                {
                    id: "18857127442034",
                    label: "350 ml.",
                    unitPrice: 35,
                    packSize: 12,
                    quantity: 0,
                },
                {
                    id: "18857127442027",
                    label: "600 ml.",
                    unitPrice: 35,
                    packSize: 12,
                    quantity: 0,
                },
                {
                    id: "18857127442010",
                    label: "1500 ml.",
                    unitPrice: 35,
                    packSize: 6,
                    quantity: 0,
                },
            ],
        },
    ]);

    const getItem = (id: string) => {
        for (const brand of catalogBrands) {
            const item = brand.items.find((i) => i.id === id);
            if (item) return item;
        }
        return undefined;
    };

    const getQuantity = (id: string) => {
        for (const brand of catalogBrands) {
            const item = brand.items.find((i) => i.id === id);
            if (item) return item.quantity;
        }
        return 0;
    };

    const setQuantity = (id: string, newValue: number) => {
        setCatalogBrand((prevBrands) =>
            prevBrands.map((brand) => ({
                ...brand,
                items: brand.items.map((item) =>
                    item.id === id ? { ...item, quantity: newValue } : item
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
                total + brand.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
            0
        );
        const itemsQuantity = catalogBrands
            .flatMap((brand) => brand.items)
            .filter((item) => item.quantity > 0)
            .map((item) => ({
                id: item.id,
                quantity: item.quantity,
            }));
        const discountAmount = getDiscount(itemsQuantity);
        console.log(
            `-------------------------\ntotal:${totalPrice}\ndiscountAmount: ${discountAmount}\nnetTotal:${
                totalPrice - discountAmount
            }`
        );
        return totalPrice - discountAmount;
    };

    return (
        <WaterCatalogContext.Provider
            value={{
                catalogBrands,
                getItem,
                getQuantity,
                setQuantity,
                getTotalQuantity,
                getTotalPrice,
            }}
        >
            {children}
        </WaterCatalogContext.Provider>
    );
};

export const useWaterCatalog = (): WaterCatalogContext => {
    const context = useContext(WaterCatalogContext);
    if (!context) {
        throw new Error("useWaterCatalog must be used within a WaterCatalogProvider");
    }
    return context;
};
