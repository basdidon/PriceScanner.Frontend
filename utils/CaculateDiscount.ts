import { RootState } from "@/store";
import { useSelector } from "react-redux";

export interface ItemQuantity {
    id: string;
    quantity: number;
}

export const CalculateDiscount = (items: ItemQuantity[]) => {
    const discounts = useSelector((state: RootState) => state.discounts);
    let totalDiscount = 0;

    // Create a shared item quantity map
    const itemMap = new Map<string, number>();
    for (const item of items) {
        itemMap.set(item.id, item.quantity);
    }

    for (const discount of discounts) {
        const { conditions, discountAmount } = discount;

        if (Array.isArray(conditions)) {
            // 📦 Bundle Discount
            let timesApplied = 0;
            let canApply = true;

            while (canApply) {
                const usedItems: [string, number][] = [];

                for (const condition of conditions) {
                    let matched = false;

                    for (const id of condition.eligibleItemIds) {
                        const available = itemMap.get(id) ?? 0;
                        if (available >= condition.requiredAmount) {
                            usedItems.push([id, condition.requiredAmount]);
                            matched = true;
                            break;
                        }
                    }

                    if (!matched) {
                        canApply = false;
                        break;
                    }
                }

                if (canApply) {
                    // Deduct used quantities
                    for (const [id, qty] of usedItems) {
                        itemMap.set(id, itemMap.get(id)! - qty);
                    }
                    timesApplied++;
                }
            }

            totalDiscount += timesApplied * discountAmount;
        } else {
            // 🧃 Single Discount
            let totalMatchedQuantity = 0;
            const usedItemIds: [string, number][] = [];

            for (const id of conditions.eligibleItemIds) {
                const available = itemMap.get(id) ?? 0;
                totalMatchedQuantity += available;
                usedItemIds.push([id, available]);
            }

            const timesApplicable = Math.floor(totalMatchedQuantity / conditions.requiredAmount);

            if (timesApplicable > 0) {
                totalDiscount += timesApplicable * discountAmount;

                // Deduct used quantities proportionally
                let needed = timesApplicable * conditions.requiredAmount;
                for (const [id, available] of usedItemIds) {
                    const used = Math.min(available, needed);
                    itemMap.set(id, available - used);
                    needed -= used;
                    if (needed <= 0) break;
                }
            }
        }
    }

    return totalDiscount;
};

export const ApplyDiscount = ({ items }: { items: ItemQuantity[] }) => {};
