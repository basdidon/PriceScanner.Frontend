import { QueryFunctionContext } from "@tanstack/react-query";

export type DiscountCondition = {
    productIds: string[];
    requiredAmount: number;
};

export type Discount = {
    id: string;
    bundleCode?: string;
    name: string;
    discountConditions: DiscountCondition[];
    discountPercentage: number;
    discountAmount: number;
    startAt: Date;
    endAt?: Date;
};

export const fetchDiscounts = async (): Promise<Discount[]> => {
    const res = await fetch(`http://192.168.1.18:5000/api/v1/discounts`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
};
