import { Product } from "@/api/product";
import { CalculateDiscount } from "@/utils/CaculateDiscount";
import { createContext, ReactNode, useContext, useState } from "react";

export interface DrinkingCatalogBrand {
    name: string;
    items: DrinkingCatalogItem[];
}

type PartialProduct = Partial<Omit<Product, "id">> & { id: string }; // make all properties optional except id

export type DrinkingCatalogItem = PartialProduct & {
    label: string;
    packSize: number;
    quantity: number;
};

interface DrinkingCatalogContext {
    catalogBrands: DrinkingCatalogBrand[];
    getItem: (id: string) => DrinkingCatalogItem | undefined;
    getQuantity: (id: string) => number;
    setQuantity: (id: string, newValue: number) => void;
    getTotalQuantity: () => number;
    getTotalPrice: () => number;
    updateCatalogPrices: () => void;
}

var WaterCatalogContext = createContext<DrinkingCatalogContext | undefined>(undefined);

export const WaterCatalogProvider = ({ children }: { children: ReactNode }) => {
    //const { getDiscount } = useDiscount();
    const [catalogBrands, setCatalogBrand] = useState<DrinkingCatalogBrand[]>([
        {
            name: "น้ำดื่ม ตราสิงห์",
            items: [
                {
                    id: "8850999002675",
                    label: "330 ml.",
                    packSize: 12,
                    quantity: 0,
                },
                {
                    id: "8850999321028",
                    label: "600 ml.",
                    packSize: 12,
                    quantity: 0,
                },
                { id: "8850999320021", label: "1500 ml.", packSize: 6, quantity: 0 },
            ],
        },
        {
            name: "น้ำดื่ม ตราคริสตัล",
            items: [
                {
                    id: "8851952150808",
                    label: "350 ml.",
                    packSize: 12,
                    quantity: 0,
                },
                { id: "8851952150789", label: "600 ml.", packSize: 12, quantity: 0 },
                { id: "8851952150796", label: "1500 ml.", packSize: 6, quantity: 0 },
            ],
        },
        {
            name: "น้ำดื่ม ตราเนสท์เล่",
            items: [
                { id: "8850127063929", label: "330 ml.", packSize: 12, quantity: 0 },
                { id: "8850124003874", label: "600 ml.", packSize: 12, quantity: 0 },
                { id: "8850124003843", label: "1500 ml.", packSize: 6, quantity: 0 },
            ],
        },
        {
            name: "น้ำดื่ม ตราฟอเรสต์",
            items: [
                {
                    id: "18857127442034",
                    label: "350 ml.",
                    packSize: 12,
                    quantity: 0,
                },
                {
                    id: "18857127442027",
                    label: "600 ml.",
                    packSize: 12,
                    quantity: 0,
                },
                {
                    id: "18857127442010",
                    label: "1500 ml.",
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
                total +
                brand.items.reduce((sum, item) => sum + (item.unitPrice ?? 0) * item.quantity, 0),
            0
        );

        const itemsQuantity = catalogBrands
            .flatMap((brand) => brand.items)
            .filter((item) => item.quantity > 0)
            .map((item) => ({
                id: item.id,
                quantity: item.quantity,
            }));
        const discountAmount = CalculateDiscount(itemsQuantity);
        console.log(
            `-------------------------\ntotal:${totalPrice}\ndiscountAmount: ${discountAmount}\nnetTotal:${
                totalPrice - discountAmount
            }`
        );
        return totalPrice - discountAmount;
    };

    const updateCatalogPrices = async () => {
        const updatedBrands = await Promise.all(
            catalogBrands.map(async (brand) => {
                const updatedItems = await Promise.all(
                    brand.items.map(async (item) => {
                        const product = await fetchProductById(item.id);
                        return product ? { ...item, unitPrice: product.unitPrice } : item;
                    })
                );
                return { ...brand, items: updatedItems };
            })
        );
        setCatalogBrand(updatedBrands);
    };

    const fetchProductById = async (id: string): Promise<Product> => {
        const res = await fetch(`http://192.168.1.28:5000/api/v1/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        return await res.json(); // Assuming it returns a `Product`
    };

    const SetSeletedItemsToCart = () => {
        for (const brand of catalogBrands) {
            for (const item of brand.items) {
            }
        }
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
                updateCatalogPrices,
            }}
        >
            {children}
        </WaterCatalogContext.Provider>
    );
};

export const useWaterCatalog = (): DrinkingCatalogContext => {
    const context = useContext(WaterCatalogContext);
    if (!context) {
        throw new Error("useWaterCatalog must be used within a WaterCatalogProvider");
    }
    return context;
};
