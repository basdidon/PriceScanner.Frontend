import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

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
            var cartItem = state.items.find((item) => item.id === action.payload.id);

            if (cartItem) throw new Error(`item(${action.payload.id}) already exists`);

            state.items = [...state.items, action.payload];
        },
        setQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
            var cartItem = state.items.find((item) => item.id === action.payload.id);

            if (!cartItem) throw new Error(`item(${action.payload.id}) not found`);

            cartItem.quantity = action.payload.quantity;
            state.items = [...state.items];
        },
        removeItem: (state, action: PayloadAction<{ id: string }>) => {
            var idx = state.items.findIndex((item) => item.id === action.payload.id);
            if (idx === -1) throw new Error(`item(${action.payload.id}) not found`);

            state.items = [...state.items.splice(idx, 1)];
        },
    },
});

export const { addItem, setQuantity } = cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default cartSlice.reducer;
