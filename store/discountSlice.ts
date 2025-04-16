import { Discount } from "@/api/discounts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Discount[] = [];

const discountSlice = createSlice({
    name: "discounts",
    initialState: initialState,
    reducers: {
        setDiscounts: (state, action: PayloadAction<Discount[]>) => {
            state = [...action.payload];
        },
    },
});

export const { setDiscounts } = discountSlice.actions;
export default discountSlice.reducer;
