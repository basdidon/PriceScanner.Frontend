import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
export interface CartItem {
    id: string;
    name: string;
    unitPrice: number;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
    // items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
}

// Define the initial state using that type
const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: "cart",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.items = [...state.items, action.payload];
        },
    },
});

export const { addItem } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default cartSlice.reducer;
