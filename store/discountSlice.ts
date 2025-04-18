import { Discount } from "@/api/discounts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Discount[] = [];

const discountSlice = createSlice({
    name: "discounts",
    initialState: initialState,
    reducers: {
        setDiscounts: (state, action: PayloadAction<Discount[]>) => {
            return [...action.payload];
        },
        addDiscount: (state, action: PayloadAction<Discount>) => {
            state.push(action.payload);
        },
    },
});

export const { setDiscounts, addDiscount } = discountSlice.actions;
export default discountSlice.reducer;
