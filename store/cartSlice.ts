import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            state.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            return state.filter((item) => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; newValue: number }>) => {
            return state.map((x) =>
                x.id === action.payload.id ? { ...x, quantity: action.payload.newValue } : x
            );
        },
        clearCart: (state) => {
            return (state = []);
        },
    },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
