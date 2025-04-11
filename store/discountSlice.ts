import { createSlice } from "@reduxjs/toolkit";

interface DiscountCondition {
    eligibleItemIds: string[];
    requiredAmount: number;
}

interface Discount {
    id: string;
    name: string;
    conditions: DiscountCondition | DiscountCondition[];
    discountAmount: number;
}

const initialState: Discount[] = [
    {
        id: "forest3for100",
        name: "forest3for100",
        conditions: [
            {
                eligibleItemIds: ["18857127442034", "18857127442027", "18857127442010"],
                requiredAmount: 3,
            },
        ],
        discountAmount: 5,
    },
];

const discountSlice = createSlice({
    name: "discounts",
    initialState: initialState,
    reducers: {},
});

export default discountSlice.reducer;
