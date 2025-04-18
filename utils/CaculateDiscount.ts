import { Discount } from "@/api/discounts";

export interface ItemQuantity {
    id: string;
    quantity: number;
}

export const CalculateDiscount = (items: ItemQuantity[], discounts: Discount[]) => {
    let totalDiscount = 0;

    // Create a shared item quantity map
    const itemMap = new Map<string, number>();
    console.log("items:");
    for (const item of items) {
        console.log(`${item.id} => ${item.quantity}`);
        itemMap.set(item.id, item.quantity);
    }

    console.log(`discounts(n) : ${discounts.length}`);
    for (const discount of discounts) {
        console.log(`- ${discount.name}`);
        const { discountConditions, discountAmount } = discount;

        let timesApplied = 0;
        let canApply = true;

        while (canApply) {
            const usedItems = new Map<string, number>();

            for (const condition of discountConditions) {
                let matched = false;
                let requiredAmount = condition.requiredAmount;
                const validItems = new Map<string, number>();

                for (const id of condition.productIds) {
                    const available = itemMap.get(id) ?? 0;
                    console.log(`available[${id}]: ${available}`);
                    const used = Math.min(requiredAmount, available);
                    requiredAmount -= used;
                    validItems.set(id, used);
                    if (requiredAmount == 0) {
                        matched = true;
                        // add validItems to usedItems
                        validItems.forEach((v, k) => usedItems.set(k, (usedItems.get(k) ?? 0) + v)); // upsert
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
                    console.log(`[apply] ${id} : ${qty}`);

                    itemMap.set(id, itemMap.get(id)! - qty);
                }
                timesApplied++;
            }
        }

        totalDiscount += timesApplied * discountAmount;
    }

    return totalDiscount;
};
/*
export const useCalculateDiscount = (items: ItemQuantity[]) => {
    const discounts = useSelector((state: RootState) => state.discounts);
    const [totalDiscount, setTotalDiscount] = useState(0);

    useEffect(() => {
        const itemMap = new Map<string, number>();
        for (const item of items) {
            itemMap.set(item.id, item.quantity);
        }

        let total = 0;

        for (const discount of discounts) {
            const { conditions, discountAmount } = discount;

            if (Array.isArray(conditions)) {
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
                        for (const [id, qty] of usedItems) {
                            itemMap.set(id, itemMap.get(id)! - qty);
                        }
                        timesApplied++;
                    }
                }

                total += timesApplied * discountAmount;
            } else {
                let totalMatchedQuantity = 0;
                const usedItemIds: [string, number][] = [];

                for (const id of conditions.eligibleItemIds) {
                    const available = itemMap.get(id) ?? 0;
                    totalMatchedQuantity += available;
                    usedItemIds.push([id, available]);
                }

                const timesApplicable = Math.floor(
                    totalMatchedQuantity / conditions.requiredAmount
                );

                if (timesApplicable > 0) {
                    total += timesApplicable * discountAmount;

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

        setTotalDiscount(total);
    }, [items, discounts]);

    return totalDiscount;
};*/

export const ApplyDiscount = ({ items }: { items: ItemQuantity[] }) => {};
