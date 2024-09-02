import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
export class CartItem {
    id: string;
    name: string;
    unitPrice: number;
    quantity: number;

    constructor(id: string, name: string, unitPrice: number, quantity: number) {
        this.id = id;
        this.name = name;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
    }

    get totalPrice(): number {
        return this.unitPrice * this.quantity;
    }
}

export interface CartState {
    items: CartItem[];
    get grandTotalPrice(): number;
}

// Define the initial state using that type
const initialState: CartState = {
    items: [],
    get grandTotalPrice(): number {
        return this.items.reduce((acc, item) => acc + item.totalPrice, 0);
    },
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
