import { DrinkingCatalogBrand } from "@/hooks/contexts/useCatalogContext";

export const DrinkingCatalogSeed: DrinkingCatalogBrand[] = [
    {
        name: "น้ำดื่ม ตราสิงห์",
        items: [
            {
                barcode: "8850999002675",
                label: "330 ml.",
                packSize: 12,
                quantity: 0,
            },
            {
                barcode: "8850999321028",
                label: "600 ml.",
                packSize: 12,
                quantity: 0,
            },
            { barcode: "8850999320021", label: "1500 ml.", packSize: 6, quantity: 0 },
        ],
    },
    {
        name: "น้ำดื่ม ตราคริสตัล",
        items: [
            {
                barcode: "8851952150808",
                label: "350 ml.",
                packSize: 12,
                quantity: 0,
            },
            { barcode: "8851952150789", label: "600 ml.", packSize: 12, quantity: 0 },
            { barcode: "8851952150796", label: "1500 ml.", packSize: 6, quantity: 0 },
        ],
    },
    {
        name: "น้ำดื่ม ตราเนสท์เล่",
        items: [
            { barcode: "8850127063929", label: "330 ml.", packSize: 12, quantity: 0 },
            { barcode: "8850124003874", label: "600 ml.", packSize: 12, quantity: 0 },
            { barcode: "8850124003843", label: "1500 ml.", packSize: 6, quantity: 0 },
        ],
    },
    {
        name: "น้ำดื่ม ตราฟอเรสต์",
        items: [
            {
                barcode: "18857127442034",
                label: "350 ml.",
                packSize: 12,
                quantity: 0,
            },
            {
                barcode: "18857127442027",
                label: "600 ml.",
                packSize: 12,
                quantity: 0,
            },
            {
                barcode: "18857127442010",
                label: "1500 ml.",
                packSize: 6,
                quantity: 0,
            },
        ],
    },
];
