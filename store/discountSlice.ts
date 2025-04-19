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
        setDiscount: (state, action: PayloadAction<Discount>) => {
            const index = state.findIndex((d) => d.id === action.payload.id);

            if (index === -1) {
                // Discount not found, add it
                state.push(action.payload);
            } else {
                // Discount found, update it
                state[index] = action.payload;
                console.log(`update discount ${action.payload.id}`);
            }
        },
        addDiscount: (state, action: PayloadAction<Discount>) => {
            state.push(action.payload);
        },
    },
});

export const { setDiscounts, setDiscount, addDiscount } = discountSlice.actions;
export default discountSlice.reducer;
