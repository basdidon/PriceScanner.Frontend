import { Product } from "@/api/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = Product & {
    quantity: number;
};

const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            if (state.some((x) => x.id === action.payload.id)) {
                console.log(`add item with id:${action.payload.id} already in cart`);
            } else {
                console.log(`add item to cart:${action.payload.unitPrice}`);
                state.push(action.payload);
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            return state.filter((item) => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: string; newValue: number }>) => {
            return state.map((x) =>
                x.id === action.payload.id ? { ...x, quantity: action.payload.newValue } : x
            );
        },
        setItem: (state, action: PayloadAction<CartItem>) => {
            if (state.some((x) => x.id === action.payload.id)) {
                return state.map((x) => (x.id === action.payload.id ? { ...action.payload } : x));
            } else {
                state.push(action.payload);
            }
        },
        clearCart: (state) => {
            return (state = []);
        },
    },
});

export const { addItem, removeItem, updateQuantity, setItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
