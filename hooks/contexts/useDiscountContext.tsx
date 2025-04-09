import { createContext, ReactNode, useContext, useState } from "react";

interface DiscountItem {
    eligibleItemIds: string[];
    requiredAmount: number;
}

interface Discount {
    id: string;
    name: string;
    discountItems: DiscountItem | DiscountItem[];
    discountAmount: number;
}

interface DiscountContextType {
    discounts: Discount[];
    getDiscount: (items: ItemQuantity[]) => number;
}

export interface ItemQuantity {
    id: string;
    quantity: number;
}

interface AppliedDiscount {}

interface AppliedDiscountList {
    appliedDiscounts: AppliedDiscount[];
    
}

const DiscountContext = createContext<DiscountContextType | undefined>(undefined);

export const DiscountProvider = ({ children }: { children: ReactNode }) => {
    const [discounts, setDiscounts] = useState<Discount[]>([
        {
            id: "forest3for100",
            name: "3 แพ็ค 100฿",
            discountItems: {
                eligibleItemIds: ["18857127442034", "18857127442027", "18857127442010"],
                requiredAmount: 3,
            },
            discountAmount: 5,
        },
    ]);

    const getDiscount = (items: ItemQuantity[]) => {
        let totalDiscount = 0;

        for (const discount of discounts) {
            const { discountItems, discountAmount } = discount;

            if (Array.isArray(discountItems)) {
                // 📦 Bundle Discount (all conditions must be satisfied)
                let canApply = true;
                for (const condition of discountItems) {
                    const matchingItem = items.find((item) =>
                        condition.eligibleItemIds.includes(item.id)
                    );
                    if (!matchingItem || matchingItem.quantity < condition.requiredAmount) {
                        canApply = false;
                        break;
                    }
                }
                if (canApply) totalDiscount += discountAmount;
            } else {
                // 🧃 Single Discount Condition (e.g., 3-for-100)
                let totalMatchedQuantity = 0;
                for (const item of items) {
                    if (discountItems.eligibleItemIds.includes(item.id)) {
                        totalMatchedQuantity += item.quantity;
                    }
                }

                const timesApplicable = Math.floor(
                    totalMatchedQuantity / discountItems.requiredAmount
                );
                totalDiscount += timesApplicable * discountAmount;
            }
        }

        return totalDiscount;
    };

    return (
        <DiscountContext.Provider value={{ discounts, getDiscount }}>
            {children}
        </DiscountContext.Provider>
    );
};

export const useDiscount = (): DiscountContextType => {
    const context = useContext(DiscountContext);
    if (!context) {
        throw new Error("useDiscount must be used within a DiscountProvider");
    }
    return context;
};
