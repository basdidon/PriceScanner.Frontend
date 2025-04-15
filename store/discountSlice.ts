import { createSlice } from "@reduxjs/toolkit";

interface DiscountCondition {
    eligibleItemIds: string[];
    requiredAmount: number;
}

export interface Discount {
    id: string;
    name: string;
    conditions: DiscountCondition | DiscountCondition[];
    discountAmount: number;
}

const initialState: Discount[] = [
    {
        id: "forest3for100",
        name: "forest3for100",
        conditions: {
            eligibleItemIds: [
                "019638c2-3ab2-44b5-a3d2-5b3549608974",
                "019638c2-434b-4a10-bf3c-3f0fb3c94f98",
                "019638c2-434b-441c-a9b2-8f974fe4c00d",
            ],
            requiredAmount: 3,
        },

        discountAmount: 5,
    },
];

const discountSlice = createSlice({
    name: "discounts",
    initialState: initialState,
    reducers: {},
});

export default discountSlice.reducer;
